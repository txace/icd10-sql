# TxAce CMHC ICD 10 Project

## Overview

This project allows CMHC users to add diagnosis records to a client's register using the new ICD10 codes and descriptions.

The project uses a combination of uscript and sql.

## Dependencies

  * freetds
    * You must have freetds and the uscript library LIB-freetds installed
  * [txace shared libraries](https://github.com/txace/library)
    * The following library / includes are required from the txace/library
       1. [inc_GetParm](https://github.com/txace/library/blob/master/inc_GetParm.usc)
       2. [inc_GetOption](https://github.com/txace/library/blob/master/inc_GetOption.usc)
       3. [lib_txaceUI](https://github.com/txace/library/blob/master/lib_txaceUI.usc)

## Clone Project

`$ git clone https://github.com/txace/icd10-sql.git`

## Install SQL

### Automated install

*note* requires Sql Managmenet Studio to be installed 

`C:\> cd icd10-sql`
`C:\icd10-sql\> install.bat`

### Manual install

#### Create the GEM tables

execute the following files:

  * [CreateTable-ICD-10-to-ICD-9-GEM.sql](https://github.com/argmonster/icd10-sql/blob/master/tables/CreateTable-ICD-10-to-ICD-9-GEM.sql)
  * [CreateTable-ICD-9-to-ICD-10-GEM.sql](https://github.com/argmonster/icd10-sql/blob/master/tables/CreateTable-ICD-9-to-ICD-10-GEM.sql)

#### Import the data into the GEM tables

execute the following files:

  * [ICD-10-GEM-Complete.sql](https://github.com/argmonster/icd10-sql/blob/master/insert/ICD-10-GEM-Complete.sql)
  * [ICD-9-GEM-Complete.sql](https://github.com/argmonster/icd10-sql/blob/master/insert/ICD-9-GEM-Complete.sql)

## Configure Parmfiles

copy icd10-sql/parm/dx10.parm to new file called dx10.ignore

edit dx10.ignore parameters to match your system. You must set:
  * o_user 
  * o_pass
  * o_ds
  * o_db
  * ReportID

## Install Parmfiles and Uscripts

### Automated install

*note* requires node js to be installed

`$ cp config.example.json config.ignore.json`

edit config.ignore with your system settings. Required settings:

  * sysname
  * webname
  * host
  * name
  * user
  * cronname
  * cron
  * scripts
    * dststart
    * trace
    * gaf_dct
    * status_dct
    * primary_axis_dct
    * abl_dct
    * reason_dct

`$ npm install`
`$ node cmhc-install`
`$ node deploy`

### Manual Install

  * Create new parmfile on the target system
  * Copy Paste contents of parm/dx10.ignore into new parmfile
  * Copy the following files into $sysname/SCRIPT/S directory
     * CONVICD10_9.usc
     * DX10.usc
     * inc_DX10.usc
     * lib_DX10.usc
  * Use CMHC Uscript interface to compile the following scripts
     * CONVICD10_9.usc
     * DX10.usc
     * inc_DX10.usc
     * lib_DX10.usc
  * Install all of the files in the Resources directory to /your/bui/installed/path/our_images/ where /your/bui/installed/path is the path to your bui installation. For Example: /c0/cmhcweb/cmchbui/cmhcbuilocal/.
