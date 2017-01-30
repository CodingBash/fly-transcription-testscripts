var intermine = require('imjs');

var flymine   = new intermine.Service({root: 'www.flymine.org/query'});
var query    = {
  "name": "Gene_RNA_seq",
  "title": "Gene --> RNA_seq expression",
  "description": "For a specified gene or set of genes show the RNA_seq expression levels.  Optionally constrain your search to genes with a particular expression level or score and/or show expression at a particular developmental stage.  Data source: modENCODE RNA_seq data analysed by FlyBAse.  Note:  The expression scores are binned into the expression levels as follows: No/Extremely low expression: 0-0; Very low expression: 1-3; Low expression: 4-10; Moderate expression: 11-25; Moderately high expression: 26-50; High expression: 51-100; Very high expression: 101-1000; Extremely high expression: >1000;",
  "constraintLogic": "A and B and C and D",
  "from": "Gene",
  "select": [
    "primaryIdentifier",
    "symbol",
    "rnaSeqResults.stage",
    "rnaSeqResults.expressionScore",
    "rnaSeqResults.expressionLevel"
  ],
  "orderBy": [
    {
      "path": "rnaSeqResults.stage",
      "direction": "ASC"
    }
  ],
  "where": [
    {
      "path": "Gene",
      "op": "LOOKUP",
      "value": "stat92e",
      "extraValue": "D. melanogaster",
      "code": "A",
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
