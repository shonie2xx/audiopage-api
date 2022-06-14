import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '30s', target: 300 },
    // { duration: '30s', target: 500 },
    { duration: '30s', target: 20000 },
    // { duration: '10m30s', target: 1000 },
    // { duration: '30s', target: 100 },
    // { duration: '45s', target: 400 },
    // { duration: '45s', target: 1600 },
    // { duration: '20s', target: 0 },
  ],
};

export default function () {
    const res = http.get(
        'http://34.90.113.219:80/api/books/')
    check(res, { "status was 200": (r) => r.body === JSON.stringify(
        [
          {
            "id": 1,
            "publisherId": 3,
            "author": "Regi Regov",
            "description": "Book about the life of Regi",
            "price": 15.99,
            "createdAt": "2022-06-12T15:17:34.186Z",
            "updatedAt": "2022-06-12T15:17:34.186Z"
          },
        ]
      ) 
    });
    sleep(1);
  }

//   export default function () {
//     const res = http.post(
//         'http://34.90.113.219:80/api/books/buy/1', {headers: {"Cookie": "auth=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk5Dd2lhV0YwSWpveE5qVTFNVEkwTWpjd0xDSmxlSEFpT2pFMk5UVXlNVEEyTnpCOS5BbE1NVzd4ZTQ5Nkl1dXV3dktjQ1BINlNjYnhGM3ZDbkdkTVFMRkI2cWdNIn0=; auth.sig=Cl6xwiYp9mEgr9BoyJYRASExmM0"}})
//     check(res, { "status was 200": (r) => r.body === JSON.stringify(
//         {
//             "id": 1,
//             "publisherId": 3,
//             "author": "Regi Regov",
//             "description": "Book about the life of Regi",
//             "price": 15.99,
//             "createdAt": "2022-06-12T15:17:34.186Z",
//             "updatedAt": "2022-06-12T15:17:34.186Z"
//         }
//       ) 
//     });
//     sleep(1);
//   }
