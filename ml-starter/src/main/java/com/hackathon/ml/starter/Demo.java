package com.hackathon.ml.starter;

import org.apache.log4j.Logger;

public class Demo {

	private final Logger LOGGER = Logger.getLogger(this.getClass());
	public static void main(String[] args) {
		Demo d = new Demo();
		d.runSentimentClassifier();
		d.runFinanceClassifier();
	}
	
	public void runSentimentClassifier()
	{
		ModelTrainer mt = new ModelTrainer();
		mt.train(this.getClass().getClassLoader().getResource("train_pos_neg").getPath(),
					this.getClass().getClassLoader().getResource("train_pos_neg").getPath()+"/pos_neg.model", 
						new String[]{"Negative","Positive"});
		Classifier c = new Classifier(this.getClass().getClassLoader().getResource("train_pos_neg/pos_neg.model").getPath());
		Classification cl = c.classify("Everyday life is like programming, I guess. If you love something you can put beauty into it.");
		
		LOGGER.info(cl);
	}
	
	public void runFinanceClassifier()
	{
		ModelTrainer mt = new ModelTrainer();
		mt.train(this.getClass().getClassLoader().getResource("train_finance").getPath(),
					this.getClass().getClassLoader().getResource("train_finance").getPath()+"/finance.model", 
						new String[]{"cards", "channels","general_banking","interest_rate","mortgage","payments","products","rewards","statements"});
		Classifier c = new Classifier(this.getClass().getClassLoader().getResource("train_finance/finance.model").getPath());
		Classification cl = c.classify("Pay this nerd 1000 pounds!");
		LOGGER.info(cl);
	}
	

}
