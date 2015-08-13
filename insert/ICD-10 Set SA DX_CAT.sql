update [t_ICD-10_ICD-10_with_GEM_AXIS]
set DX_CAT = 'SA'
where [ICD-10_Code] like 'F1%'

update [t_ICD-10_ICD-9_with_GEM_AXIS]
set DX_CAT = 'SA'
where [ICD-10_Code] like 'F1%'

