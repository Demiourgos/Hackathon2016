package com.hackathon.ml.starter;

public class Classification {
	
	private String category;
	private double score;
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getScore() {
		return score;
	}
	public Classification(String category, double score) {

		this.category = category;
		this.score = score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	@Override
	public String toString() {
		return "Classification [category=" + category + ", score=" + score + "]";
	}
	
	

}
