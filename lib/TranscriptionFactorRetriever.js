var intermine = require('imjs');

var gene = "eve";

var flymine   = new intermine.Service({root: 'www.flymine.org/query'});
var query    = {
  "name": "Gene_transcriptionFactors",
  "title": "Gene --> Transcription Factors",
  "description": "Show all known transcription factors for a particular D. melanogaster gene. (Data Source: REDfly, FlyBase).",
  "constraintLogic": "A and C",
  "from": "Gene",
  "select": [
    "primaryIdentifier",
    "symbol",
    "regulatoryRegions.primaryIdentifier",
    "regulatoryRegions.chromosome.primaryIdentifier",
    "regulatoryRegions.chromosomeLocation.end",
    "regulatoryRegions.chromosomeLocation.start",
    "regulatoryRegions.dataSets.dataSource.name",
    "regulatoryRegions.factor.primaryIdentifier",
    "regulatoryRegions.factor.symbol",
    "regulatoryRegions.sequence.residues"
  ],
  "orderBy": [
    {
      "path": "regulatoryRegions.primaryIdentifier",
      "direction": "ASC"
    }
  ],
  "where": [
    {
      "path": "regulatoryRegions",
      "type": "TFBindingSite"
    },
    {
      "path": "Gene",
      "op": "LOOKUP",
      "value": gene,
      "code": "A",
      "editable": true,
      "switched": "LOCKED",
      "switchable": false
    },
    {
      "path": "organism.name",
      "op": "=",
      "value": "Drosophila melanogaster",
      "code": "C",
      "editable": true,
      "switched": "LOCKED",
      "switchable": false
    }
  ]
};

flymine.rows(query).then(function(rows) {
  console.log("No. of rows: " + rows.length);
  rows.forEach(function printRow(row) {
    console.log(row);
  });
});
