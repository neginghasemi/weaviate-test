# Weaviate Job Postings Project

This project demonstrates how to use Weaviate to manage a dataset of job postings. The notebook sets up a Weaviate instance, creates a schema for the job postings data, and imports the data into the instance. Then the created instance is used for searching among the postings. With generative search, you can see the skills that are needed for each posting and the skills needed based on all the search results.


### [🔗 Demo Link](http://weaviate.netlify.app/)

![recording](https://github.com/neginghasemi/weaviate-test/assets/61196570/221100e7-a058-468b-b353-addf4958c11b)


## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)

## Installation

To run this project, you need to install the Weaviate client.

## Setup

1. Clone the Repository:

2. Connect to Weaviate:

    Replace the placeholders in the notebook with your Weaviate URL, API key, and OpenAI API key.

3. Download the Dataset:

    Download the LinkedIn job postings dataset from [Kaggle](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings) and place it in the project directory.

4. Create the Schema:

    The schema for the "Postings" collection is created with the following properties:
    - job_id: Number
    - title: Text
    - description: Text
    - company_name: Text
5. Setup the Frontend
    - `npm install`
    - `npm start`
## Usage

Run the [Jupyter notebook](./Weaviate-Test-1.ipynb) to execute the following steps:

1. Install the required packages.
2. Connect to the Weaviate instance.
3. Download and load the dataset.
4. Create the schema for the job postings collection.
5. Import the data into Weaviate.

Ensure that your environment is configured correctly and the required API keys are in place.

You can see the example of different search results in the note book.

You can also work with the visualize format [HERE!](https://weaviate.netlify.app)
