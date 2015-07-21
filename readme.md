## Sql scripts for ICD 9 to 10 mapping

### Configuration Notes

#### inc_DX10.usc

| Variable  | Type | Values | Description |
| --------  | ---- | ------ | ----------- |
|ReportID   | X    |        | Must be a valid IRMS Form on your system |
|Title      | X    |        | Title of the report to show in IRMS list |

#### lib_DX10.usc

| Variable  | Type | Values | Description |
| --------  | ---- | ------ | ----------- |
|o_user | X | | Sql User name to use with freetds
|o_pass | X | | Sql User password to use with freetds
|o_ds | X | | the data source to use 
|o_db | X | | the database to use
