import {test,expect} from '@playwright/test';


const postData = {
    "id": 7890,
    "category": {
      "id": 78,
      "name": "German Shepherd"
    },
    "name": "Ronie",
    "photoUrls": [
      "https://thisismyronie.com/56788.img"
    ],
    "tags": [
      {
        "id": 2,
        "name": "maleRonie"
      }
    ],
    "status": "available"
  };

  const putData = {
    "id": 7890,
    "category": {
      "id": 78,
      "name": "German Shepherd"
    },
    "name": "Ronie",
    "photoUrls": [
      "https://thisismyronieupdated.com/56788.img"
    ],
    "tags": [
      {
        "id": 2,
        "name": "maleRonie"
      }
    ],
    "status": "available"
  };


test('1 API post call', async({request})=>{
  const response = await request.post("https://petstore.swagger.io/v2/pet",{data: postData});
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test('2 API put call', async({request})=>{
    const response = await request.put("https://petstore.swagger.io/v2/pet",{data: putData});
    console.log(await response.json());
    //or 
   // JSON.parse(await response.text());
    expect(response.status()).toBe(200);
  });
  
  test('3 API get call after updating photo', async({request})=>{
    const response = await request.get("https://petstore.swagger.io/v2/pet/7890");
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    const photoUrlsContainUpdated = responseBody.photoUrls.some(url => url.includes('updated'));
    expect(await photoUrlsContainUpdated).toBe(true);
});

test('4 API delete call after updating photo', async({request})=>{
    const response = await request.delete("https://petstore.swagger.io/v2/pet/7890");
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
});

test('5 API get call after delete', async({request})=>{
    
    const response = await request.get("https://petstore.swagger.io/v2/pet/7890");
    console.log(response)
    expect(response.status()).toBe(200);
});
