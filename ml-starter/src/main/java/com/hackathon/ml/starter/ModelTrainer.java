package com.hackathon.ml.starter;

import java.io.File;
import java.io.IOException;

import org.apache.log4j.Logger;

import com.aliasi.classify.Classification;
import com.aliasi.classify.Classified;
import com.aliasi.classify.DynamicLMClassifier;
import com.aliasi.classify.LMClassifier;
import com.aliasi.corpus.ObjectHandler;
import com.aliasi.util.AbstractExternalizable;
import com.aliasi.util.Compilable;
import com.aliasi.util.Files;

public class ModelTrainer {
	/**
	 * Train the model based on training dataset
	 * 
	 * 
	 * 
	 */
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	@SuppressWarnings("unchecked")
	public void train(String inputDirectory, String outfile, String [] mCategories) {
		File out = new File(
				outfile);
		if(out.exists())
		{
			System.out.println("Out file "+out.getPath()+" exists - will be recreated");
			out.delete();
			
		}
		File trainDir;
		String[] categories;
		@SuppressWarnings("rawtypes")
		LMClassifier lmc; //Language model classifier
		trainDir = new File(inputDirectory); //Directory of training dataset
		categories = trainDir.list();
		
		int nGram = 7; // the nGram level, any value between 7 and 12 works
		
		lmc = DynamicLMClassifier.createNGramProcess(mCategories, nGram);

		for (int i = 0; i < categories.length; ++i) {
			String category = categories[i];
			Classification classification = new Classification(category);
			File file = new File(trainDir, categories[i]);
			File[] trainFiles = file.listFiles();
			for (int j = 0; j < trainFiles.length; ++j) {
				File trainFile = trainFiles[j];
				LOGGER.info("Reading training data from - "+trainFile.getPath());
				String review = null;
				try {
					review = Files.readFromFile(trainFile, "ISO-8859-1");
				} catch (IOException e) {
					e.printStackTrace();
				}
				Classified<String> classified = new Classified<String>(review,
						classification);
				((ObjectHandler<Classified<String>>) lmc).handle(classified);
			}
		}
		try {
			
			out.createNewFile();
			AbstractExternalizable.compileTo((Compilable) lmc,out);//saving serialize object to out file
			System.out.println("Succefully created a model at - "+out.getPath());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	

}
