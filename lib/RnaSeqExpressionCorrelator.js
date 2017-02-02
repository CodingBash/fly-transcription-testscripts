var intermine = require('imjs');
var Promise = require('promise');
var async = require('async');
var pcorr = require('compute-pcorr');
var util = require('util');
// TODO: Implement synchronous style within the promise.
var flymine   = new intermine.Service({root: 'www.flymine.org/query'});


var executeEveQuery = function(){
  return new Promise(function(resolve, reject){
    var eveQuery = retrieveQuery("eve");
    var eveRowList = [];
    flymine.rows(eveQuery).then(function(rows) {
      rows.forEach(function addRow(row) {
        // TODO: Ensure order
        // TODO: Change from index to field name
        eveRowList.push(row[3]);
        });
      resolve(eveRowList);
    });
  });
};

var executeStatQuery = function(){
  return new Promise(function(resolve, reject){
    var statQuery = retrieveQuery("zen");
    var statRowList = [];
    flymine.rows(statQuery).then(function(rows) {
      rows.forEach(function addRow(row) {
        // TODO: Ensure order
        // TODO: Change from index to field name
        statRowList.push(row[3]);
      });
      resolve(statRowList);
    });
  });
};

var dualExecution = function(){
  return new Promise(function(resolve, reject){
    executeEveQuery().then(function(eveRowList){
      executeStatQuery().then(function(statRowList){
        resolve({eveRowList: eveRowList, statRowList: statRowList});
      });
    });
  });
};

dualExecution().then(function(lists){
  console.log(lists.eveRowList);
  console.log(lists.statRowList);
  var mat = pcorr(lists.eveRowList, lists.statRowList);
  console.log(mat);
});

function retrieveQuery(gene){
  return {
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
        "value": gene,
        "extraValue": "D. melanogaster",
        "code": "A",
        "editable": true,
        "switched": "LOCKED",
        "switchable": false
      }
    ]
  };
}
