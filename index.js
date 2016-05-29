/**
 * Particles component for A-Frame.
 *
 * ShaderParticleEngine by Squarefeet (https://github.com/squarefeet).
 */

var SPE = require('./lib/SPE.js');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('particle-system', {

    schema: {
        preset: {
            type: 'string',
            default: 'dust'
        }, 
        maxAge: {
            type: 'number',
            default: 5
        },
        type: {
            type: 'number',
            default: SPE.distributions.BOX
            /* SPE.distributions.SPHERE, SPE.distributions.DISC */
        },
        accelerationValue: {
            type: 'vec3',
            default: {x: 0, y: -10, z: 0}
        },
        accelerationSpread: {
            type: 'vec3',
            default: {x: 10, y: 0, z: 10}
        },
        velocityValue: {
            type: 'vec3',
            default: {x: 0, y: 25, z: 0}
        },
        velocitySpread: {
            type: 'vec3',
            default: {x: 10, y: 7.5, z: 10}
        },
        wiggle: {
            type: 'number',
            default: 0
        },
        drag: {
            type: 'number',
            default: 0 
        },
        color: {
            type: 'string',
            default: '#FFFFFF'
        },
        size: {
            type: 'number',
            default: 1
        },
        opacity: {
            type: 'number',
            default: 1
        },
        direction: {
            type: 'number',
            default: 1
            /* -1 */
        },
        duration: {
            type: 'number',
            default: null 
        },
        particleCount: {
            type: 'number',
            default: 100
        }, 
        maxParticleCount: {
            type: 'number',
            default: 250000
        } 
    },


    init: function() {},
 

    update: function (oldData) {

        var loader = new THREE.TextureLoader();
        var particle_texture = loader.load(
            './images/smokeparticle.png',
            function (texture) {
                return texture;
            },
            function (xhr) {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (xhr) {
              console.log('An error occurred');
            }
        );

        this.clock = new THREE.Clock();
      
        this.particleGroup = new SPE.Group({
            texture: {
                    value: particle_texture 
                }
          });

          var emitter = new SPE.Emitter({
              maxAge: {
                  value: this.data.maxAge
              },
              type: {
                  value: this.data.type
              },
              position: {
                  value: this.el.object3D.position,
                  spread: new THREE.Vector3(0, 0, 0)
              },
              rotation: {
                  axis: this.el.object3D.rotation,
                  angle: 0
              },
              acceleration: {
                  value: this.data.accelerationValue,
                  spread: this.data.accelerationSpread
              },
              velocity: {
                  value: this.data.velocityValue,
                  spread: this.data.velocitySpread 
              },
              color: {
                  value: [ new THREE.Color('white'), new THREE.Color('red') ]
              },
              size: {
                  value: this.data.size
              },
              wiggle: {
                  value: this.data.wiggle
              },
              drag: {
                  value: this.data.drag
              },
              direction: {
                  value: this.data.direction
              },
              duration: {
                  value: this.data.duration
              },
              opacity: this.data.opacity,
              particleCount: this.data.particleCount,
              maxParticleCount: this.data.maxParticleCount
          });

          this.particleGroup.addEmitter(emitter);
          this.el.sceneEl.object3D.add(this.particleGroup.mesh);
    },


    tick: function(time) {

        this.particleGroup.tick(this.clock.getDelta());
    },


    remove: function() {}

});

