# ML-Letter-Prediction
This project uses a Tensorflow neural network to learn and classify handwritten characters.

The user can enter samples into the training dataset by drawing the letter on the grid, selecting the letter from the dropdown, then pressing the "Train" button. This will format the data and the labels, enter them into the data set, and train the model on the dataset. During training the screen will display the epoch accuracy of the training, currently, the model doesn't perform well and can only be somewhat accurate if it is only trained with two letters. This is because the model doesn't have convolutional or pooling layers yet which would improve accuracy.
