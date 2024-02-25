# Running eReceipitfy on Google Cloud Platform

Welcome to the setup guide for running eReceiptify on Google Cloud Platform (GCP). This guide will walk you through deploying the project either on Google Kubernetes Engine (GKE) or Google Cloud Run, depending on your preference and project needs.

## Prerequisites

- A Google Cloud Platform account. Sign up at [Google Cloud](https://cloud.google.com) if you don't have an account yet.
- The `gcloud` command-line tool installed. Follow the [Installing Google Cloud SDK](https://cloud.google.com/sdk/docs/install) guide for installation instructions.

## To run our backend service:
- **Clone this repository**:
```sh
git clone https://github.com/Kaixun123/eReceiptify-backend
```
- **Install Dependenices required for this project**:
```sh
npm install
```
- **Deploy the application on google cloud platform (gcp)**
```sh
gcloud app deploy
```
