
# MarketLens – AI-Powered Competitor Analysis

**Turn Competitor Data into Strategic Business Insights.**

MarketLens is an AI-powered competitor analysis platform that automates business research, competitor discovery, customer review analysis, and comparative insights. By combining web data extraction, workflow automation, and artificial intelligence, it helps businesses understand their competitive landscape and make informed strategic decisions.

**Live Application:** [MarketLens](https://market-lense.vercel.app/)

---

## About the Project

MarketLens is designed to simplify and automate the process of competitor research. Instead of manually searching for competitors, collecting customer reviews, and comparing business profiles, users can perform these tasks through a unified platform.

The system identifies potential competitors based on an entered business name and city, allows users to select relevant competitors, collects business profile information and customer reviews through Apify, and uses the OpenAI API to generate meaningful comparisons, insights, and strategic recommendations.

Users can also optionally include their own business in the analysis to evaluate its position against selected competitors.

## Problem Statement

Understanding competitors is essential for making effective business decisions. However, traditional competitor research often involves:

- Manually identifying competing businesses.
- Collecting business information from multiple sources.
- Reading and analyzing large volumes of customer reviews.
- Comparing customer feedback and business profiles.
- Identifying market strengths, weaknesses, and opportunities.

These activities can be time-consuming and difficult to perform consistently.

MarketLens addresses these challenges by automating competitor discovery, data collection, and AI-powered analysis within a single platform.

## Key Features

- **Automated Competitor Discovery:** Identifies potential competitors based on the entered business name and city.
- **Custom Competitor Selection:** Allows users to review discovered businesses and select the competitors they want to analyze.
- **Optional Own Business Analysis:** Users can include their own business for a more personalized competitive comparison.
- **Flexible Review Timeframes:** Supports analysis based on different review periods, including the last 30 days, last 90 days, or all available review history.
- **Automated Data Extraction:** Uses Apify to collect relevant business profile information and customer reviews for the selected businesses and timeframe.
- **AI-Powered Review Analysis:** Processes collected data to identify useful patterns and customer feedback insights.
- **Competitor Comparison:** Generates comparative insights across selected businesses using the collected data.
- **Strategic Recommendations:** Provides AI-generated recommendations to help businesses identify improvement opportunities and competitive advantages.
- **Downloadable Reports:** Allows users to export or download generated analysis reports for future reference.

##  How It Works

MarketLens follows an automated research and analysis workflow:

### 1. Enter Business Details
Users provide a business name and city to initiate competitor discovery.

### 2. Discover Competitors
The platform identifies potential competing businesses based on the provided information.

### 3. Select Businesses for Analysis
Users select competitors from the discovered list. They can also optionally include their own business in the analysis.

### 4. Choose the Review Timeframe
Users select the review period they want to analyze:

- Last 30 days
- Last 90 days
- All available review history

### 5. Collect Business Data
Apify extracts relevant business profile information and customer reviews according to the selected businesses and timeframe.

### 6. Generate AI-Powered Insights
The collected data is processed through an automated n8n workflow and analyzed using the OpenAI API.

### 7. View Comparisons and Recommendations
MarketLens presents comparative insights, business analysis, and strategic recommendations based on the gathered data.

### 8. Export Reports
Users can download the generated analysis reports for future reference.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React |
| Workflow Automation | n8n |
| Web Data Extraction | Apify |
| Artificial Intelligence | OpenAI API |
| Deployment | Vercel |

## Technical Highlights

- **Automated Workflow Orchestration:** n8n coordinates the research, data collection, and AI analysis workflow.
- **Web Data Extraction:** Apify automates the collection of profile information and customer reviews.
- **AI-Driven Analysis:** OpenAI API transforms collected business data and customer feedback into meaningful insights and recommendations.
- **Dynamic Competitor Research:** Competitor discovery and selection are based on the user's business name, location, and analysis requirements.
- **Integrated Web Application:** React provides the user-facing interface for configuring and viewing competitor analyses.

## Portfolio Purpose

This repository is intended for **portfolio and demonstration purposes** to showcase MarketLens

The **n8n workflows are not included** in this repository. 

It is shared for portfolio evaluation and professional review only.

## Live Demo

Explore the deployed application:

### [Visit MarketLens](https://market-lense.vercel.app/)




---

<p align="center">
  <strong>MarketLens</strong> — Turning Market Research into Smarter Decisions.
</p>
