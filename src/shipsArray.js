//ships
export const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0,1],
        [0,10]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0,1,2],
        [0,10,10*2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0,1,2],
        [0,10,10*2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0,1,2,3],
        [0,10,10*2,10*3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0,1,2,3,4],
        [0,10,10*2,10*3,10*4]
      ]
    }
]