import pandas as pd

bio_diversity_metadata = pd.read_csv("DataSets/Belly_Button_Biodiversity_Metadata.csv")

idx = 0
new_col = bio_diversity_metadata['SAMPLEID']
bio_diversity_metadata.insert(loc=idx, column='sample', value=new_col)

bio_diversity_metadata['sample'] = 'BB_' + bio_diversity_metadata['sample'].astype(str)


otu = pd.read_csv("DataSets/belly_button_biodiversity_otu_id.csv")



metadata = pd.read_csv("DataSets/metadata_columns.csv")



samples = pd.read_csv("DataSets/belly_button_biodiversity_samples.csv")

def names():

    sample_names = list(samples)
    sample_names = sample_names[1:]
    return sample_names

if __name__ == "__main__":
    names()

def otu_list():

    otu_descriptions = list(otu.lowest_taxonomic_unit_found)

    return otu_descriptions

if __name__ == "__main__":
    otu_list()

def json(sample):

    df = bio_diversity_metadata[['sample','AGE','BBTYPE','ETHNICITY','GENDER','LOCATION','SAMPLEID']]

    df = df.set_index('sample')

    json_dict = df.to_dict('index')

    return json_dict[sample]

if __name__ == "__main__":
    json()

def washing():

    df2 = bio_diversity_metadata[['sample','WFREQ']]

    df2 = df2.set_index('sample')

    washing_dict = df2.to_dict('index')

    return washing_dict

def samples_data(sample3):

    top_samples = samples.sort_values(by=[sample3], ascending=False)

    top_samples = top_samples[0:10]

    top_id = top_samples.index.tolist()

    top_samples = top_samples[sample3].tolist()

    top = {"id":top_id, "sample":top_samples}

    return top


if __name__ == "__main__":
    washing()
