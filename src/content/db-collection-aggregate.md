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
$collStats
$sample
$redact
$replaceRoot
}}

\* *for security and performance reasons, only a subset of the stages are supported*

{{arg options object}}

{{arg forEach function}}

{{arg onComplete function}}

<div class="message is-warning">
  <div class="message-header">Differences with Mongodb</div>
  <div class="message-body">
    <code>$collStats</code> returns only `localTime` and `storageStats` fields.
  </div>
</div>
