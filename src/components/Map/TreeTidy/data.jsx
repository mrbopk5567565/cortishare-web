export const data = {
  "id": "Modeling Methods",
  "isRoot": true,
  "children": [
    {
      "id": "Classification",
      "children": [
        {
          "id": "Logistic regression"
        },
        {
          "id": "Linear discriminant analysis"
        },
        {
          "id": "Rules"
        },
        {
          "id": "Decision trees"
        },
        {
          "id": "Naive Bayes"
        },
        {
          "id": "K nearest neighbor"
        },
        {
          "id": "Probabilistic neural network"
        },
        {
          "id": "Support vector machine"
        }
      ]
    },
    {
      "id": "Arias",
      "children": [
        {
          "id": "Models Arias",
          "children": [
            {
              "id": "Arias initializations"
            },
            {
              "id": "Arias parameter choices"
            },
            {
              "id": "Arias architectures"
            },
            {
              "id": "Arias modeling methods"
            },
            {
              "id": "Arias training sets"
            },
            {
              "id": "Arias feature sets"
            }
          ]
        },
        {
          "id": "Methods Sylas",
          "children": [
            {
              "id": "Sylas selection"
            },
            {
              "id": "Sylas fusion"
            }
          ]
        },
        {
          "id": "Common Garen",
          "children": [
            {
              "id": "Bagging Garen"
            },
            {
              "id": "Boosting Garen"
            },
            {
              "id": "AdaBoost Garen"
            }
          ]
        }
      ]
    },
    {
      "id": "Consensus",
      "children": [
        {
          "id": "Models diversity",
          "children": [
            {
              "id": "Different initializations"
            },
            {
              "id": "Different parameter choices"
            },
            {
              "id": "Different architectures"
            },
            {
              "id": "Different modeling methods"
            },
            {
              "id": "Different training sets"
            },
            {
              "id": "Different feature sets"
            }
          ]
        },
        {
          "id": "Methods",
          "children": [
            {
              "id": "Classifier selection"
            },
            {
              "id": "Classifier fusion"
            }
          ]
        },
        {
          "id": "Common",
          "children": [
            {
              "id": "Bagging"
            },
            {
              "id": "Boosting"
            },
            {
              "id": "AdaBoost"
            }
          ]
        }
      ]
    },
    {
      "id": "Regression",
      "children": [
        {
          "id": "Multiple linear regression"
        },
        {
          "id": "Partial least squares"
        },
        {
          "id": "Multi-layer feedforward neural network Multi-layer feedforward neural network Multi-layer feedforward neural network"
        },
        {
          "id": "General regression neural network"
        },
        {
          "id": "Support vector regression"
        }
      ]
    },
  ]
}

export const data1 = {
  isRoot: true,//whether the root node
  id: '73efd8a3-85dc-4a06-b61d-2c51aceaf28b',
  shape: 'image',//type
  img: '/Scripts/plugins/AntV/1.png',//image link address
  label: 'System Administrator',//label
  children: [
    {//Tree node parent-child relationship
      id: 'SubTreeNode1',
      shape: 'image',
      img: '/Scripts/plugins/AntV/1.png',
      label: 'Zhang San',
      style: {//Custom style
        cursor: 'pointer'//cursor: finger
      },
      raw: {},
      children: [{
        id: 'SubTreeNode1.1',
        shape: 'image',
        img: '/Scripts/plugins/AntV/1.png',
        label: 'Li Si',
      }, {
        id: 'SubTreeNode1.2',
        shape: 'image',
        img: '/Scripts/plugins/AntV/1.png',
        label: 'Wang Wu',
        children: [{
          id: 'SubTreeNode1.2.1',
          shape: 'image',
          img: '/Scripts/plugins/AntV/1.png',
          label: 'Zhang San',
        }, {
          id: 'SubTreeNode1.2.2',
          shape: 'image',
          img: '/Scripts/plugins/AntV/1.png',
          label: 'Li Si',
        }, {
          id: 'SubTreeNode1.2.3',
          shape: 'image',
          img: '/Scripts/plugins/AntV/1.png',
          label: 'Wang Wu',
        }]
      }]
    }, {
      id: 'SubTreeNode2',
      shape: 'image',
      img: '/Scripts/plugins/AntV/1.png',
      label: 'zyz',
      children: [{
        id: 'SubTreeNode2.1',
        shape: 'image',
        img: '/Scripts/plugins/AntV/1.png',
        label: 'Wang Wu',
      }]
    }, {
      id: 'SubTreeNode3',
      shape: 'image',
      img: '/Scripts/plugins/AntV/2.png',
      label: 'Li Si',
      children: [{
        id: 'SubTreeNode3.1',
        shape: 'image',
        img: '/Scripts/plugins/AntV/2.png',
        label: 'Zhang San',
      }, {
        id: 'SubTreeNode3.2',
        shape: 'image',
        img: '/Scripts/plugins/AntV/2.png',
        label: 'Li Si',
      }, {
        id: 'SubTreeNode3.3',
        shape: 'image',
        img: '/Scripts/plugins/AntV/2.png',
        label: 'Wang Wu',
      }]
    },]

};


export const data2 = {
  nodeData: {
    id: 'root',
    topic: 'Mind Elixir',
    root: true,
    children: [
      {
        topic: 'What is Minde Elixir',
        id: 'bd4313fbac40284b',
        direction: 0,
        expanded: true,
        children: [
          { topic: 'A mind map core', id: 'beeb823afd6d2114' },
          { topic: 'Free', id: 'c1f068377de9f3a0' },
          { topic: 'Open-Source', id: 'c1f06d38a09f23ca' },
          {
            topic: 'Use without JavaScript framework',
            id: 'c1f06e4cbcf16463',
            expanded: true,
            children: [],
          },
          {
            topic: 'Use in your own project',
            id: 'c1f1f11a7fbf7550',
            children: [
              {
                topic: "import MindElixir from 'mind-elixir'",
                id: 'c1f1e245b0a89f9b',
              },
              { topic: 'new MindElixir({...}).init()', id: 'c1f1ebc7072c8928' },
            ],
          },
          {
            topic: 'Easy to use',
            id: 'c1f0723c07b408d7',
            expanded: true,
            children: [
              {
                topic: 'Use it like other mind map application',
                id: 'c1f09612fd89920d',
              },
            ],
          },
        ],
      },
      {
        topic: 'Basics',
        id: 'bd1b66c4b56754d9',
        direction: 0,
        expanded: true,
        children: [
          { topic: 'tab - Create a child node', id: 'bd1b6892bcab126a' },
          { topic: 'enter - Create a sibling node', id: 'bd1b6b632a434b27' },
          { topic: 'del - Remove a node', id: 'bd1b983085187c0a' },
        ],
      },
      {
        topic: 'Focus mode',
        id: 'bd1b9b94a9a7a913',
        direction: 1,
        expanded: true,
        children: [
          {
            topic: 'Right click and select Focus Mode',
            id: 'bd1bb2ac4bbab458',
          },
          {
            topic: 'Right click and select Cancel Focus Mode',
            id: 'bd1bb4b14d6697c3',
          },
        ],
      },
      {
        topic: 'Left menu',
        id: 'bd1b9d1816ede134',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Node distribution',
            id: 'bd1ba11e620c3c1a',
            expanded: true,
            children: [
              { topic: 'Left', id: 'bd1c1cb51e6745d3' },
              { topic: 'Right', id: 'bd1c1e12fd603ff6' },
              { topic: 'Both l & r', id: 'bd1c1f03def5c97b' },
            ],
          },
        ],
      },
      {
        topic: 'Bottom menu',
        id: 'bd1ba66996df4ba4',
        direction: 1,
        expanded: true,
        children: [
          { topic: 'Full screen', id: 'bd1ba81d9bc95a7e' },
          { topic: 'Return to Center', id: 'bd1babdd5c18a7a2' },
          { topic: 'Zoom in', id: 'bd1bae68e0ab186e' },
          { topic: 'Zoom out', id: 'bd1bb06377439977' },
        ],
      },
      {
        topic: 'Link',
        id: 'bd1beff607711025',
        direction: 0,
        expanded: true,
        children: [
          { topic: 'Right click and select Link', id: 'bd1bf320da90046a' },
          {
            topic: 'Click the target you want to link',
            id: 'bd1bf6f94ff2e642',
          },
          { topic: 'Modify link with control points', id: 'bd1c0c4a487bd036' },
        ],
      },
      {
        topic: 'Node style',
        id: 'bd1c217f9d0b20bd',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Font Size',
            id: 'bd1c24420cd2c2f5',
            style: { fontSize: '32', color: '#3298db' },
          },
          {
            topic: 'Font Color',
            id: 'bd1c2a59b9a2739c',
            style: { color: '#c0392c' },
          },
          {
            topic: 'Background Color',
            id: 'bd1c2de33f057eb4',
            style: { color: '#bdc3c7', background: '#2c3e50' },
          },
          { topic: 'Add tags', id: 'bd1cff58364436d0', tags: ['Completed'] },
          {
            topic: 'Add icons',
            id: 'bd1d0317f7e8a61a',
            icons: ['😂'],
            tags: ['www'],
          },
          {
            topic: 'Bolder',
            id: 'bd41fd4ca32322a4',
            style: { fontWeight: 'bold' },
          },
        ],
      },
      {
        topic: 'Draggable',
        id: 'bd1f03fee1f63bc6',
        direction: 1,
        expanded: true,
        children: [
          {
            topic:
              'Drag a node to another node\nand the former one will become a child node of latter one',
            id: 'bd1f07c598e729dc',
          },
        ],
      },
      {
        topic: 'TODO',
        id: 'bd1facea32a1967c',
        direction: 1,
        expanded: true,
        children: [
          { topic: 'Add image', id: 'bd1fb1ec53010749' },
          { topic: 'Free node (position)', id: 'bd42d3e3bee992b9' },
          { topic: 'Style adjustment', id: 'beeb7f3db6ad6496' },
        ],
      },
      {
        topic: 'Export data',
        id: 'beeb7586973430db',
        direction: 1,
        expanded: true,
        children: [
          { topic: 'JSON', id: 'beeb784cc189375f' },
          { topic: 'HTML', id: 'beeb7a6bec2d68f5' },
        ],
      },
      {
        topic: 'Caution',
        id: 'bd42dad21aaf6bae',
        direction: 0,
        style: { background: '#f1c40e' },
        expanded: true,
        children: [
          {
            topic: 'Only save manually',
            id: 'bd42e1d0163ebf04',
            expanded: true,
            children: [
              {
                topic: 'Save button in the top-right corner',
                id: 'bd42e619051878b3',
                expanded: true,
                children: [],
              },
              { topic: 'ctrl + S', id: 'bd42e97d7ac35e99' },
            ],
          },
        ],
      },
    ],
    expanded: true,
  },
  linkData: {},
}



export const data3 = {
  nodeData: {
    id: 'root',
    topic: 'HTML structure',
    root: true,
    children: [
      {
        topic: 'div.map-container',
        id: '33905a6bde6512e4',
        expanded: true,
        children: [
          {
            topic: 'div.map-canvas',
            id: '33905d3c66649e8f',
            tags: ['A special case of grp tag', 'ssssss'],
            expanded: true,
            children: [
              {
                topic: 'root',
                id: '33906b754897b9b9',
                tags: ['A special case of t tag'],
                expanded: true,
                children: [{ topic: 'tpc', id: '33b5cbc93b9968ab' }],
              },
              {
                topic: 'children.box',
                id: '33906db16ed7f956',
                expanded: true,
                children: [
                  {
                    topic: 'grp(group)',
                    id: '33907d9a3664cc8a',
                    expanded: true,
                    children: [
                      {
                        topic: 't(top)',
                        id: '3390856d09415b95',
                        expanded: true,
                        children: [
                          {
                            topic: 'tpc(topic)',
                            id: '33908dd36c7d32c5',
                            expanded: true,
                            children: [
                              { topic: 'text', id: '3391630d4227e248' },
                              { topic: 'icons', id: '33916d74224b141f' },
                              { topic: 'tags', id: '33916421bfff1543' },
                            ],
                            tags: ['E() function return'],
                          },
                          {
                            topic: 'epd(expander)',
                            id: '33909032ed7b5e8e',
                            tags: ['If had child'],
                          },
                        ],
                        tags: ['createTop retun'],
                      },
                      {
                        topic: 'children',
                        id: '339087e1a8a5ea68',
                        expanded: true,
                        children: [
                          {
                            topic: 'grp',
                            id: '3390930112ea7367',
                            tags: [
                              'what add node actually do is to append grp tag to children',
                            ],
                          },
                          { topic: 'grp...', id: '3390940a8c8380a6' },
                        ],
                        tags: ['createChildren return'],
                      },
                      { topic: 'svg.svg3rd', id: '33908986b6336a4f' },
                    ],
                    tags: ['have child'],
                  },
                  {
                    topic: 'grp',
                    id: '339081c3c5f57756',
                    expanded: true,
                    children: [
                      {
                        topic: 't',
                        id: '33b6160ec048b997',
                        expanded: true,
                        children: [{ topic: 'tpc', id: '33b616f9fe7763fc' }],
                      },
                    ],
                    tags: ['no child'],
                  },
                  { topic: 'grp...', id: '33b61346707af71a' },
                ],
              },
              { topic: 'svg.svg2nd', id: '3390707d68c0779d' },
              { topic: 'svg.linkcontroller', id: '339072cb6cf95295' },
              { topic: 'svg.topiclinks', id: '3390751acbdbdb9f' },
            ],
          },
          { topic: 'cmenu', id: '33905f95aeab942d' },
          { topic: 'toolbar.rb', id: '339060ac0343f0d7' },
          { topic: 'toolbar.lt', id: '3390622b29323de9' },
          { topic: 'nmenu', id: '3390645e6d7c2b4e' },
        ],
      },
    ],
  },
  linkData: {},
}