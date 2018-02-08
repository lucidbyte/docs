// TODO: add anchors to each header tag based on the document scope

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const Md = require('markdown-it');
const md = new Md({ html: true });

let count = 0;
const Root = (props = {}, children = {}) => {
  const { label = '', content = '', type = 'node' } = props;
  return { label, content, children, type, index: count++ };
};

const Child = (content) => {
  return { content, index: count++ };
};

const Section = (props, children) => {
  props.type = 'section';
  return Root(props, children);
};

const emptyValue = () => '';
const mustacheRe = /\{\{[^{}]*?\}\}/g;
const transformContext = (markdown, context = {}, globalContext) => {
  const parsed = markdown.replace(mustacheRe, (template) => {
    const [fnName, ...args] = template.slice(2, -2).trim().split(/[\s\n]/);
    const fn = context[fnName]
      || globalContext[fnName]
      || emptyValue;
    if (fn === emptyValue) {
      console.log(`\ntemplate: \n"${template}"\nwas ignored\n`);
    }
    return fn(...args);
  });
  return parsed;
};

const globalContext = {
  _id: () => /* @markdown */`[\`_id\`](#/docs/document/_id)`,
  client: () =>  /* @markdown */`[\`client\`](#/docs/api/client)`,
  collection: () => /* @markdown */`[\`collection\`](#/docs/api/client/collection)`,
  arg: (name, type) => {
    return /* @html */`
<div class="Arg">
<span class="ArgName">${name}</span> • <span class="ArgType">${type}</span>
</div>
    `.trim();
  }
};

module.exports.data = async () => {
  const getDoc = (file, context) => {
    return readFile(path.resolve(__dirname, `content/${file}`), 'utf8')
      .then(markdown => {
        return md.render(
          transformContext(markdown, context, globalContext)
        );
      })
      .catch(err => {
        console.log('render error', err);
      });
  };

  // TODO: Figure out a way to set the order of the contents. Currently we're relying on the object order which is not guaranteed.

  return {
    'Quickstart': Section({
    }, {
      'Install': Child(await getDoc('install.package-managers.md')),
      'Create project': Child(await getDoc('getting-started.create-project.md')),
      'Database basics': Child(await getDoc('getting-started.db-intro.md')),
    }),
    'API': Section({}, {
      LoginForm: Child(await getDoc('LoginForm.md')),
      createProject: Child(await getDoc('createProject.md')),
      client: Root({
        content: await getDoc('db.md'),
      }, {
        collection: Root({
          content: await getDoc('db.collection.md'),
        }, {
          get: Child(await getDoc('db.collection.get.md')),
          query: Child(await getDoc('db.collection.query.md')),
          set: Child(await getDoc('db.collection.set.md')),
          update: Child(await getDoc('db.collection.update.md')),
          insert: Child(await getDoc('db.collection.insert.md')),
          delete: Child(await getDoc('db.collection.delete.md')),
          aggregate: Child(
            await getDoc('db-collection-aggregate.md', {
              pipelineStagesWhitelist: (...stages) => {
                return stages.map((o) => {
                  const operatorWithoutSpecialChar = o.slice(1);
                  const href = `https://docs.mongodb.com/manual/reference/operator/aggregation/${operatorWithoutSpecialChar}/`;
                  return `- [${o}](${href})\n`;
                }).join('');
              }
            }),
          ),
          createIndex: Child(await getDoc('db.collection.createIndex.md')),
          getIndexes: Child(await getDoc('db.collection.getIndexes.md')),
        }),
        flush: Root({
          content: await getDoc('flush.md'),
        })
      })
    }),
    Info: Section({}, {
      'query batching': Child(await getDoc('info.query-batching.md'))
    }),
    Document: Section({}, {
      _id: Child(await getDoc('document._id.md'))
    })
  };
};
