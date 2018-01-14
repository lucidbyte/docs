``` javascript
collection.aggregate(
  pipelineStages,
  options,
  forEach,
  onComplete
);
```

Calculates aggregate values for the data in a {{collection}}.

### Arguments

{{arg pipelineStages array}}

An array of aggregation stages. The following stages are supported*:

{{ pipelineStagesWhitelist
$limit
$match
$project
$skip
$sort
$sortByCount
$indexStats
$sample
$redact
$replaceRoot
}}

\* *for security and performance reasons, only a subset of the stages are supported*

{{arg options object}}

{{arg forEach function}}

{{arg onComplete function}}
