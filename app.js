//const getData = function () {
//fetch(
//"api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4eb94309c7891a62437268af9921df5b"
//)
//.then((response) => response.json())
//.then((data) => console.log(data[0]));
//};

//getData();

const testPromise = async function () {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=14b138fd386ea13bf4ae40177706e7a5"
  );
  const data = await res.json();
  console.log(data);
  console.log(data.list[0].main);
};
testPromise();
