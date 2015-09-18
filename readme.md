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



## DX10.usc

1. UI Modes
 There are 4 UI modes supported by the DX10.usc script
  A. REPORT
  B. VIEW
  C. DATAENTRY
  D. !DP

A. REPORT Mode
  Report mode restricts users to only viewing the most recent snapshot of the category id set by the `irmsreportid` parameter.

B. View Mode
   View mode restricts users to a display only page of the top layer of the DX 10 record for the active client

C. Dataentry Mode
   DateEntry mode lets users enter DX10 records for other staff who completed the diagnosis. The UI exposes an extra field required field for the users to select the staff id of the staff who completed the diagnosis.

D. Not Data Present Mode
  If the Mode is not set then staff have access to enter DX10 records as diagnosing staff.

2. DX10.usc Configuration
  A. User Access Settings
     You can restrict access to the DX10 script by setting the `Exclude_staff_by` parameter. There are 4 valid options for this parm:
   I. STAFFDST
   II. DCT
   III. GROUP
   IV. !dp

I.#### `Exclude_staff_by STAFFDST`

`STAFFDST` Does a `$dbread` of the `$operstaffid` looking up the dst configured by the `creds_dst` setting. The value retrieved will be compaired to the items in the list set by `entry_creds`. If `creds_dst_dct` and `creds_dst_dct_op` are set then the value retrieve by the `$dbread` is edited against the dct / alternate code of `creds_dst_dct` / `creds_dst_dct_op`. 

If the value is found in the `entry_creds[]` list then access to the program is denied

##### Examples

```
exclude_staff_by STAFFDST
creds_dst S.ENC.CRED
creds_dst_dct 601
creds_dst_dct_op 1
entry_creds-1 H
```

In this example the current operator will be checked for a value in their S.ENC.CRED _stand alone_ dst. The value is then edited against dct number 601's alt 1 value. If that value matchs 'H' then the staff is _excluded_ from continuing

#### `Exclude_staff_by DCT`

`DCT` Does a `$dct()` lookup to see if the value of `$operstaffid` is present in the DCT. If the staff id is _NOT_ present to in the DCT then the user is _excluded_ from continuing.

##### Examples

```
exclude_staff_by DCT
staff_access_dct 2071
```

#### `Exclude_staff_by GROUP`

`GROUP` Does a `$getopergroups()` to look up the `$oper` signon groups. Only the group membership is considered. Group membership is compared to the `allowed_groups[]` list. If the user is a _NOT_ a member of a group that is present in the `allowed_groups[]` list then the user is _excluded_ from continuing.

##### Examples

```
exclude_staff_by GROUP
allowed_groups-1 1
allowed_groups-2 99
```

#### `Exclude_staff_by `

When `Exclude_staff_by` value is Not Data Present then no users are restricted from accessing the script.

### Force Mode Settings

You can force the UI `mode` by setting the `force_mode_by` parameter. There are 4 valid options for this parm:
   * `STAFFDST`
   * `DCT`
   * `GROUP`
   * `!dp`

#### `force_mode_by STAFFDST`

`STAFFDST` Does a `$dbread` of the `$operstaffid` looking up the dst configured by the `creds_dst` setting. The value retrieved will be compaired to the items in the list set by `entry_creds`. If `creds_dst_dct` and `creds_dst_dct_op` are set then the value retrieve by the `$dbread` is edited against the dct / alternate code of `creds_dst_dct` / `creds_dst_dct_op`. 

If the value is found in the `entry_creds[]` list then the UI `mode` is changed to the value of the `force_mode` parameter.

##### Examples

```
force_mode DATAENTRY
force_mode_by STAFFDST
creds dst S.ENC.CRED
creds_dst_dct 601
creds_dst_dct_op 1
entry_creds-1 H
```

In this example the current operator will be checked for a value in their S.ENC.CRED _stand alone_ dst. The value is then edited against dct number 601's alt 1 value. If that value matchs 'H' then the script's UI `mode` is set to `"DATAENTRY"`.

#### `force_mode_by DCT`

`DCT` Does a `$dct()` lookup to see if the value of `$operstaffid` is present in the DCT. If the staff id is _NOT_ present to in the DCT then the script's UI `mode` is set to value of the `force_mode` parameter.

##### Examples

```
force_mode_by DCT
staff_access_dct 2071
```

#### `force_mode_by GROUP`

`GROUP` Does a `$getopergroups()` to look up the `$oper` signon groups. Only the group membership is considered. Group membership is compared to the `allowed_groups[]` list. If the user is a _NOT_ a member of a group that is present in the `allowed_groups[]` list then the script's UI `mode` is set to the value of the `force_mode` parameter.

##### Examples

```
force_mode_by GROUP
allowed_groups-1 1
allowed_groups-2 99
```

### Allowed to Diagnosis Settings

When the UI Mode is set to `DATAENTRY` you can validate the staff id that is entered as the diangosing staff. To enable this validation use the `allowed_to_dx` parameter. There are 4 valid options for `allowed_to_dx`

   * `STAFFDST`
   * `DCT`
   * `GROUP`
   * `!dp`

#### `allowed_to_dx STAFFDST`

`STAFFDST` Does a `$dbread` of the `$operstaffid` looking up the dst configured by the `dx_dst` setting. The value retrieved will be compaired to the items in the list set by `dx_creds[]`. If `dx_dst_dct` and `dx_dst_dct_op` are set then the value retrieve by the `$dbread` is edited against the dct / alternate code of `dx_dst_dct` / `dx_dst_dct_op`. 

If the value is found in the `entry_creds[]` list then the UI `mode` is changed to the value of the `force_mode` parameter.

##### Examples

```
force_mode DATAENTRY
allowed_to_dx STAFFDST
dx_dst S.ENC.CRED
dx_dst_dct 601
dx_dst_dct_op 1
dx_creds-1 H
```

In this example the current operator will be checked for a value in their S.ENC.CRED _stand alone_ dst. The value is then edited against dct number 601's alt 1 value. If that value matchs 'H' then the script accepts that staff id as a valid id for completing a diagnosis.

#### `allowed_to_dx DCT`

`DCT` Does a `$dct()` lookup to see if the value of `$operstaffid` is present in the DCT. If the staff id is present to in the DCT then the script accepts that staff id as a valid id for completing a diagnosis.

##### Examples

```
allowed_to_dx DCT
staff_access_dct 2071
```

#### `allowed_to_dx GROUP`

`GROUP` Does a `$getopergroups()` to look up the `$oper` signon groups. Only the group membership is considered. Group membership is compared to the `dx_groups[]` list. If the user is a member of a group that is present in the `dx_groups[]` list then the script accepts that staff id as a valid id for completing a diagnosis.

##### Examples

```
allowed_to_dx GROUP
dx_groups-1 1
dx_groups-2 99
```

### ICD9 Gaf DST
 icd9_gaf_dst DST_NAME
 ex.) icd9_gaf_dst c.dxaxvc

### Optional: ICD10_File/ICD9_File
Used to quickly return either the ICD 10 or 9 Description from a file instead of relying on the database. Reason? No major requirements to retrofit existing scripts to simply display the description
Files used are in the data directory

##### Examples
```
ICD10_File /c0/EXPORT/ICD10/t_ICD-10_ICD-10_with_GEM_AXIS.csv
ICD9_File /c0/EXPORT/ICD10/t_ICD-10_ICD-9_with_GEM_AXIS.csv
