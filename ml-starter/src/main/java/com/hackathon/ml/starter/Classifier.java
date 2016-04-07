package com.hackathon.ml.starter;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;

import org.apache.log4j.Logger;

import com.aliasi.classify.ConditionalClassification;
import com.aliasi.classify.LMClassifier;
import com.aliasi.util.AbstractExternalizable;

public class Classifier implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4656657745492075179L;

	String[] categories;
	
	@SuppressWarnings("rawtypes")
	LMClassifier lmc;
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());

	/**
	 * Constructor loading serialized object created by Model class to local
	 * LMClassifer of this class
	 */
	@SuppressWarnings("rawtypes")
	public Classifier(String trainedModelFilePath) {
		try {
			LOGGER.info("Reading model from - "+trainedModelFilePath);
			lmc = (LMClassifier) AbstractExternalizable.readObject(new File(trainedModelFilePath));
	    	categories = lmc.categories();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Classify  the text 
	 * 
	 * @param text
	 * @return classified group 
	 */
	public Classification classify(String text) {
		ConditionalClassification classification = lmc.classify(text);
		return new Classification(classification.bestCategory(), classification.score(categories.length-1));
	}
	
	
}
