const guess = document.getElementById('guess');
const label = document.getElementById('charSelect');
const output = document.getElementById('output');
const learn = document.getElementById('train');
learn.addEventListener('click', learnFUNC);
guess.addEventListener('click', guessFUNC);


//create model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 3600, activation: 'relu', inputShape: [3600] }));
model.add(tf.layers.dense({ units: 1367, activation: 'relu'}));
model.add(tf.layers.dense({ units: 26, activation: 'softmax' }));

//compile model
model.compile({
  optimizer: tf.train.adam(lr=1e-6),
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});

//store training data
var trainingData = [];
var trainingLabels = [];

//function to train model
function learnFUNC(){
  //output to user
  output.innerHTML = "Training...";
  
  //using setTimeout so that the inner html will update on screen for the user
  setTimeout(function(){
  //1x3600 array from grid containing 1 for a black square and 0 for white square
  trainingData.push(inputLayer);
  //value from dropdown for which character is being trained
  trainingLabels.push(parseInt(label.value));

  //convert input data array into tensor 
  const inputTensor = tf.tensor2d(trainingData, [trainingData.length,3600]);

  //convert label to one-hot encoded tensors
  const labelsTensor = tf.oneHot(trainingLabels, 26);

  //train the model 
  model.fit(inputTensor, labelsTensor, {
    batchSize: 7,
    epochs: 100,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
        output.innerHTML = "Training...<br>" + `Epoch Accuracy = ${logs.acc.toFixed(4)*100}%`;
      }
    } 
  })
  .then((history) => {
    console.log(history);
    //output to user
    output.innerHTML = "Training complete!";
  });
  }, 0);
}

function guessFUNC(){
  //get input data array and convert to tensor
  const inputData = inputLayer;
  const inputTensor = tf.tensor2d(inputData, [1,3600]);

  //make prediction and output to console
  const prediction = model.predict(inputTensor);
  prediction.print();

  //convert prediction for output to user (displays top three predictions and confidence)
  const results = prediction.dataSync();
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  const indecies = greatestConfidenceAnswers(results);

  //format output
  output.innerHTML = "<pre>" + alphabet[indecies[0]]+" = "+(results[indecies[0]]*100).toFixed(2)+"%\n"+alphabet[indecies[1]]+" = "+(results[indecies[1]]*100).toFixed(2)+"%\n"+alphabet[indecies[2]]+" = "+(results[indecies[2]]*100).toFixed(2)+"%</pre>";
}

function greatestConfidenceAnswers(array) {
  //create a copy of the array to avoid modifying the original array
  const copyArray = [...array];

  //sort the array in descending order
  copyArray.sort((a, b) => b - a);

  //get the indices of the three greatest elements
  const indices = [];
  for (let i = 0; i < 3; i++) {
    const index = array.indexOf(copyArray[i]);
    indices.push(index);
  }

  return indices;
}