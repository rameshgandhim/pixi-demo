/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
export const fireEmitter: any = {
  'alpha': {
    'start': 0.8,
    'end': 0,
  },
  'scale': {
    'start': 0.25,
    'end': 0.75,
    'minimumScaleMultiplier': 1,
  },
  'color': {
    'start': '#fff191',
    'end': '#ff622c',
  },
  'speed': {
    'start': 50,
    'end': 500,
    'minimumSpeedMultiplier': 1,
  },
  'acceleration': {
    'x': 100,
    'y': 0,
  },
  'maxSpeed': 0,
  'startRotation': {
    'min': 265,
    'max': 275,
  },
  'noRotation': false,
  'rotationSpeed': {
    'min': 50,
    'max': 50,
  },
  'lifetime': {
    'min': 0.1,
    'max': 0.95,
  },
  'blendMode': 'normal',
  'frequency': 0.001,
  'emitterLifetime': -1,
  'maxParticles': 1000,
  'pos': {
    'x': 0,
    'y': 0,
  },
  'addAtBack': false,
  'spawnType': 'circle',
  'spawnCircle': {
    'x': 0,
    'y': 0,
    'r': 1000,
  },
  'behaviors': [
    {
      'type': 'alpha',
      'config': {
        'alpha': {
          'list': [
            {
              'time': 0,
              'value': 1,
            },
            {
              'time': 1,
              'value': 0,
            },
          ],
        },
      },
    },
    {
      'type': 'moveSpeedStatic',
      'config': {
        'min': 50,
        'max': 500,
      },
    },
    {
      'type': 'scale',
      'config': {
        'scale': {
          'list': [
            {
              'time': 0,
              'value': 0.6,
            },
            {
              'time': 1,
              'value': 0.2,
            },
          ],
        },
        'minMult': 1.1,
      },
    },
    {
      'type': 'color',
      'config': {
        'color': {
          'list': [
            {
              'time': 0,
              'value': 'fff191',
            },
            {
              'time': 1,
              'value': 'ff622c',
            },
          ],
        },
      },
    },
    {
      'type': 'rotation',
      'config': {
        'accel': 0,
        'minSpeed': 50,
        'maxSpeed': 100,
        'minStart': 265,
        'maxStart': 275,
      },
    },
    {
      'type': 'textureOrdered',
      'config': {
        'textures': [
          '/assets/img/fire.png',
          '/assets/img/particle.png',
        ],
      },
    },
    {
      'type': 'spawnShape',
      'config': {
        'type': 'torus',
        'data': {
          'x': 0,
          'y': 0,
          'radius': 75,
          'innerRadius': 10,
          'affectRotation': false,
        },
      },
    },
  ],
};

export const sparkEmitter: any = {
  'alpha': {
    'start': 0,
    'end': 1,
  },
  'scale': {
    'start': 0.25,
    'end': 1,
    'minimumScaleMultiplier': 1,
  },
  'color': {
    'start': '#fff191',
    'end': '#ff622c',
  },
  'speed': {
    'start': 50,
    'end': 500,
    'minimumSpeedMultiplier': 1,
  },
  'acceleration': {
    'x': 100,
    'y': 0,
  },
  'maxSpeed': 0,
  'startRotation': {
    'min': 265,
    'max': 275,
  },
  'noRotation': false,
  'rotationSpeed': {
    'min': 50,
    'max': 50,
  },
  'lifetime': {
    'min': 0.1,
    'max': 0.95,
  },
  'blendMode': 'normal',
  'frequency': 0.001,
  'emitterLifetime': -1,
  'maxParticles': 1000,
  'pos': {
    'x': 0,
    'y': 0,
  },
  'addAtBack': false,
  'spawnType': 'circle',
  'spawnCircle': {
    'x': 0,
    'y': 0,
    'r': 1000,
  },
  'behaviors': [
    {
      'type': 'alpha',
      'config': {
        'alpha': {
          'list': [
            {
              'time': 0,
              'value': 0,
            },
            {
              'time': 0.4,
              'value': 0,
            },
            {
              'time': 1,
              'value': 1,
            },
          ],
        },
      },
    },
    {
      'type': 'moveSpeedStatic',
      'config': {
        'min': 50,
        'max': 500,
      },
    },
    {
      'type': 'scale',
      'config': {
        'scale': {
          'list': [
            {
              'time': 0,
              'value': 0.6,
            },
            {
              'time': 1,
              'value': 0.9,
            },
          ],
        },
        'minMult': 1.1,
      },
    },
    {
      'type': 'color',
      'config': {
        'color': {
          'list': [
            {
              'time': 0,
              'value': 'fff191',
            },
            {
              'time': 1,
              'value': 'ff622c',
            },
          ],
        },
      },
    },
    {
      'type': 'rotation',
      'config': {
        'accel': 0,
        'minSpeed': 50,
        'maxSpeed': 100,
        'minStart': 265,
        'maxStart': 275,
      },
    },
    {
      'type': 'textureOrdered',
      'config': {
        'textures': [
          '/assets/img/spark.png',
        ],
      },
    },
    {
      'type': 'spawnShape',
      'config': {
        'type': 'torus',
        'data': {
          'x': 0,
          'y': 0,
          'radius': 75,
          'innerRadius': 10,
          'affectRotation': false,
        },
      },
    },
  ],
};
