# 📊 Modern Data Warehouse for Sales Analytics

*Authors:* * [Anagha Pradeep](https://github.com/Malusree-2001)
* [Sreelakshmi Vattapparambil Gopakumar](https://github.com/sreelakshmi-gopakumar)

![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=power-bi&logoColor=black)
![ETL](https://img.shields.io/badge/ETL-Data%20Engineering-blue?style=for-the-badge)

## 📖 Project Overview

This project demonstrates an *end-to-end Data Engineering and Business Intelligence solution. We built a modern Data Warehouse from scratch using **SQL Server, transforming raw CSV data into actionable insights visualized in **Power BI*.

The goal was to modernize a legacy sales system by building a scalable ETL pipeline and a Star Schema data model to analyze customer behavior and product performance.

---

## 📺 Project Demo
(Click the link below to watch a 2-minute walkthrough of the architecture and dashboard)

*[🎥 WATCH THE DEMO VIDEO HERE]* (Replace this text with your YouTube or Loom link)

---

## 🏗 Architecture & Methodology

We followed the *Medallion Architecture* (Bronze, Silver, Gold) to ensure data quality and scalability.

### 1. 🥉 Bronze Layer (Raw Ingestion)
* *Source:* Raw CSV files (ERP and CRM data(Kaggle)) containing sales, customer, and product information.
* *Action:* Ingested data "as-is" into SQL Server using *Bulk Insert*.
* *Goal:* Create a faithful copy of the source data.

### 2. 🥈 Silver Layer (Transformation & Cleaning)
* *Action:* Developed *SQL Stored Procedures* to clean and standardize data.
* *Transformations:*
    * Normalized field names (e.g., Cst_Id → Customer_Key).
    * Handled missing values and duplicates.
    * Standardized date formats and data types.
    * Derived new columns for analysis.

### 3. 🥇 Gold Layer (Data Modeling)
* *Action:* Designed a *Star Schema* optimized for BI reporting.
* *Dimensions:* dim_customers, dim_products
* *Fact Table:* fact_sales
* *Goal:* Enable high-performance querying and simplified reporting.

---

## 📊 Business Intelligence (Power BI)

We connected *Power BI* directly to the Gold Layer (SQL Server) to build an interactive dashboard.

*Key Insights Delivered:*
* *Total Revenue Analysis:* Tracked over $29M in total sales.
* *Customer Segmentation:* Identified that the top VIP customers contribute significantly to revenue (Pareto Principle).
* *Product Performance:* Visualized top-selling categories (e.g., Bikes) vs. underperforming ones.
* *Trends:* Analyzed sales growth over a 4-year period (2010–2014).

---

## 🛠 Tech Stack

* *Database:* Microsoft SQL Server 2022
* *GUI:* SQL Server Management Studio (SSMS)
* *ETL:* T-SQL Stored Procedures
* *Visualization:* Microsoft Power BI
* *Source Data:* CSV / Excel

---

## ⚙ How to Run This Project

If you want to clone and run this project locally, follow these steps:

1.  *Clone the Repo:*
    bash
    git clone [https://github.com/sreelakshmi-gopakumar/Modern_Data_Warehouse_for_Sales_Analytics.git](https://github.com/sreelakshmi-gopakumar/Modern_Data_Warehouse_for_Sales_Analytics.git)
    
2.  *Set up SQL Server:*
    * Open init_database.sql and execute it to create the database.
    * Run the schema scripts in this order: ddl_bronze.sql, ddl_silver.sql, ddl_gold.sql.
3.  *Load Data:*
    * Update the file paths in proc_load_bronze.sql to match your local CSV folder.
    * Execute EXEC bronze.load_bronze to ingest raw data.
4.  *Run ETL:*
    * Execute EXEC silver.load_silver to clean and transform data.
5.  *View Reports:*
    * Open the .pbix file in Power BI Desktop to view the dashboard.

---

## 🤝 Contributors

| Name | GitHub |
|------|--------|
| *Anagha Pradeep* | [Profile](https://github.com/Malusree-2001) |

| *Sreelakshmi Vattapparambil Gopakumar* | [Profile](https://github.com/sreelakshmi-gopakumar) |
