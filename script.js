document.addEventListener('DOMContentLoaded', function () {
  const images = document.getElementById('image-container');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  const h3 = document.getElementById('h');

  let selectedImages = [];
  let state = 1;

  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to generate random image order
  function generateRandomOrder() {
    const imgClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
    const repeatedClass = imgClasses[Math.floor(Math.random() * imgClasses.length)];
    const imageOrder = shuffleArray([...imgClasses, repeatedClass]);
    return imageOrder;
  }

  // Function to render images
  function renderImages() {
    const imageOrder = generateRandomOrder();
    images.innerHTML = '';
    imageOrder.forEach((imgClass, index) => {
      const img = document.createElement('img');
      img.src = '';
      img.classList.add(imgClass);
      img.addEventListener('click', () => handleImageClick(img, imgClass));
      images.appendChild(img);
    });
  }

  // Function to handle image click
  function handleImageClick(img, imgClass) {
    if (state === 1) {
      h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
      resetButton.style.display = 'inline-block';
      selectedImages.push(imgClass);
      img.classList.add('selected');
      state = 2;
    } else if (state === 2) {
      if (!selectedImages.includes(imgClass)) {
        selectedImages.push(imgClass);
        img.classList.add('selected');
        state = 3;
      }
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = 'inline-block';
    }
  }

  // Function to reset the state
  function resetState() {
    selectedImages = [];
    state = 1;
    renderImages();
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
  }

  // Event listener for reset button
  resetButton.addEventListener('click', resetState);

  // Event listener for verify button
  verifyButton.addEventListener('click', function () {
    if (selectedImages[0] === selectedImages[1]) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    verifyButton.style.display = 'none';
  });

  // Initialize the game
  renderImages();
});
