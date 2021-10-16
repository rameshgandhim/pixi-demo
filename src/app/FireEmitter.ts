/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
export const fireEmitter: any = {
  'alpha': {
    'start': 0.62,
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
    'start': 500,
    'end': 500,
    'minimumSpeedMultiplier': 1,
  },
  'acceleration': {
    'x': 0,
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
    'max': 0.75,
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
    'r': 10,
  },
  'behaviors': [
    {
      'type': 'alpha',
      'config': {
        'alpha': {
          'list': [
            {
              'time': 0,
              'value': 0.62,
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
        'min': 500,
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
              'value': 0.25,
            },
            {
              'time': 1,
              'value': 0.75,
            },
          ],
        },
        'minMult': 1,
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
        'maxSpeed': 50,
        'minStart': 265,
        'maxStart': 275,
      },
    },
    {
      'type': 'textureRandom',
      'config': {
        'textures': [
          '/assets/img/particle.png',
          '/assets/img/fire.png',
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
          'radius': 10,
          'innerRadius': 0,
          'affectRotation': false,
        },
      },
    },
  ],
};
