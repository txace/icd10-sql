USE [CMHC_Export]
GO

/****** Object:  Table [dbo].[t_ICD-10_ICD-9_with_GEM_AXIS]    Script Date: 5/20/2015 11:11:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[t_ICD-10_ICD-9_with_GEM_AXIS](
	[UniqID] [varchar](25) NULL,
	[ICD-9_Code] [varchar](5) NULL,
	[ICD-9_Code_DotNotation] [varchar](6) NULL,
	[ICD-9_Description] [varchar](255) NULL,
	[ICD-10_Code] [varchar](7) NULL,
	[ICD-10_Code_DotNotation] [varchar](8) NULL,
	[ICD-10_Description] [varchar](255) NULL,
	[DSM-4_Axis] [varchar](1) NULL,
	[Approximate] [varchar](1) NULL,
	[NoMap] [varchar](1) NULL,
	[Combination] [varchar](1) NULL,
	[Scenario] [varchar](1) NULL,
	[ChoiceList] [varchar](1) NULL,
	[DX_CAT] [varchar](2) NULL,
	[TermSearch] [varchar](500) NULL,
	[EffDt] [datetime] NULL,
	[EndDt] [datetime] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



