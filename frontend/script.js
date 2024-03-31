document.addEventListener('DOMContentLoaded', function () {
    // Define an array of colors
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    // Select the color options container
    const colorOptionsContainer = document.querySelector('.color-dropdown .color-options');

    // Populate color options dynamically
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function () {
            updateColor(parseInt(color.replace('#', '0x'), 16));
            // Hide the color options after choosing a color
            colorOptionsContainer.classList.add('hidden');
        });
        colorOptionsContainer.appendChild(colorOption);
    });

    // Set up Three.js
    const canvas = document.getElementById('previewCanvas');
    if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.width, canvas.height);

        // Initial color and text values
        let currentColor = 0x00ff00; // Default color

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: currentColor });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Create a text mesh
        let textMesh;
        const loader = new THREE.FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
            const textGeometry = new THREE.TextGeometry('', {  // Empty string initially
                font: font,
                size: 1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(-1, 1, 0); // Set text position
            scene.add(textMesh);
        });

        // Position the camera
        camera.position.z = 5;

        // Render the scene
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        // Function to update cube color
        function updateColor(color) {
            currentColor = color;
            cube.material.color.set(color);
        }

        // Function to update text
        function updateText(newText) {
            if (textMesh) {
                scene.remove(textMesh);
            }

            loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
                const textGeometry = new THREE.TextGeometry(newText, {
                    font: font,
                    size: 1,
                    height: 0.1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-1, 1, 0); // Set text position
                scene.add(textMesh);
            });
        }

        // Listen for text input changes
        const textInput = document.getElementById('textInput');
        textInput.addEventListener('input', function () {
            updateText(textInput.value);
        });
    } else {
        console.error("Canvas element with ID 'previewCanvas' not found.");
    }

    // Listen for size and style selection changes
    const sizeSelect = document.getElementById('sizeSelect');
    const styleSelect = document.getElementById('styleSelect');
    sizeSelect.addEventListener('change', function () {
        updateSize(sizeSelect.value);
    });
    styleSelect.addEventListener('change', function () {
        updateStyle(styleSelect.value);
    });

    // Function to update size
    function updateSize(size) {
        // Assuming there's a preview element with ID 'previewCanvas'
        const previewCanvas = document.getElementById('previewCanvas');

        // Update the size of the preview element based on the selected size
        switch (size) {
            case 'small':
                previewCanvas.style.width = '200px';
                previewCanvas.style.height = '200px';
                break;
            case 'medium':
                previewCanvas.style.width = '300px';
                previewCanvas.style.height = '300px';
                break;
            case 'large':
                previewCanvas.style.width = '400px';
                previewCanvas.style.height = '400px';
                break;
            default:
                // Handle default case or error
                break;
        }
    }

    // Function to update style
    function updateStyle(style) {
        // Assuming there's a preview element with ID 'previewCanvas'
        const previewCanvas = document.getElementById('previewCanvas');

        // Update the style of the preview element based on the selected style
        switch (style) {
            case 'style1':
                previewCanvas.style.border = '1px solid red';
                // Add more style changes as needed
                break;
            case 'style2':
                previewCanvas.style.border = '2px dashed blue';
                // Add more style changes as needed
                break;
            case 'style3':
                previewCanvas.style.border = 'none';
                // Add more style changes as needed
                break;
            default:
                // Handle default case or error
                break;
        }
    }









    // Function for handling image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        console.log('Uploaded file:', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                // Update preview with the uploaded image
                updatePreview(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    // Function for updating the preview with the uploaded image
    // Function for updating the preview with the uploaded image
// Function for updating the preview with the uploaded image
// Function for updating the preview with the uploaded image
function updatePreview(imageUrl) {
    const previewCanvas = document.getElementById('previewCanvas');

    if (previewCanvas) {
        const img = new Image();

        img.onload = function() {
            const ctx = previewCanvas.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
                previewCanvas.width = img.width;
                previewCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            } else {
                console.error('Failed to get 2D context for canvas.');
            }
        };

        img.onerror = function() {
            console.error('Error loading image:', imageUrl);
            // Handle the error accordingly
        };

        img.src = imageUrl;
    } else {
        console.error("Preview canvas element not found.");
    }
}
    // Add event listener for image upload
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImageUpload);

    // Add event listener for color dropdown toggle
    const colorDropdownBtn = document.getElementById('colorDropdownBtn');
    colorDropdownBtn.addEventListener('click', function() {
        colorOptionsContainer.classList.toggle('hidden');
    });
});















// Function for adjusting dimensions
function adjustDimensions(width, height, depth) {
    // Assuming you have a 3D model object named 'model'

    // Set the scale of the model based on user input
    model.scale.set(width / initialWidth, height / initialHeight, depth / initialDepth);
    
    // Update the initial dimensions for future adjustments
    initialWidth = width;
    initialHeight = height;
    initialDepth = depth;
}





// Function for updating background options
function updateBackground(option) {
    const previewCanvas = document.getElementById('previewCanvas');

    switch (option) {
        case 'solid':
            previewCanvas.style.background = 'lightgray'; // Change background color to light gray
            break;
        case 'gradient':
            previewCanvas.style.background = 'linear-gradient(to right, red, yellow)'; // Apply a linear gradient background
            break;
        case 'image':
            previewCanvas.style.background = 'url("path_to_image.jpg")'; // Apply a background image
            break;
        default:
            // Handle default case or error
            break;
    }
}



// Function for texture customization
function customizeTexture() {
    const textureSelect = document.getElementById('textureSelect');
    const selectedTexture = textureSelect.value; // Get the selected texture option

    // Assuming you have a 3D model object named 'cube'
    const loader = new THREE.TextureLoader();
    let textureUrl;

    // Load the corresponding texture based on the selected option
    switch (selectedTexture) {
        case 'texture1':
            textureUrl = 'path_to_texture1.jpg';
            break;
        case 'texture2':
            textureUrl = 'path_to_texture2.jpg';
            break;
        case 'texture3':
            textureUrl = 'path_to_texture3.jpg';
            break;
        default:
            // Handle default case or error
            break;
    }

    // Apply the selected texture to the cube
    loader.load(textureUrl, function(texture) {
        cube.material.map = texture;
        cube.material.needsUpdate = true;
    });
}



// Function for logo placement
function placeLogo() {
    const logoInput = document.getElementById('logoInput');
    const file = logoInput.files[0]; // Get the uploaded logo file
    const positionX = parseFloat(document.getElementById('positionXInput').value);
    const positionY = parseFloat(document.getElementById('positionYInput').value);
    const size = parseFloat(document.getElementById('sizeInput').value);
    const rotation = parseFloat(document.getElementById('rotationInput').value);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoUrl = e.target.result;

            // Assuming you have a 3D model object named 'cube' in your scene
            const loader = new THREE.TextureLoader();
            loader.load(logoUrl, function(logoTexture) {
                const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture });
                const logoGeometry = new THREE.PlaneGeometry(size, size);
                const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
                // Position the logo
                logoMesh.position.set(positionX, positionY, 0);
                // Rotate the logo
                logoMesh.rotation.set(0, 0, rotation);
                scene.add(logoMesh); // Add the logo to the scene
            });
        };
        reader.readAsDataURL(file);
    }
}








function saveDesign() {
    // Assuming 'customizationState' is an object representing the current customization state
    const customizationState = {
        color: currentColor, // Assuming currentColor is the color of the 3D model
        text: textInput.value, // Assuming textInput is the input element for entering text
        size: sizeSelect.value, // Assuming sizeSelect is the select element for choosing size
        style: styleSelect.value // Assuming styleSelect is the select element for choosing style
        // Add more properties as needed
    };

    // Serialize the customization state object to JSON
    const serializedState = JSON.stringify(customizationState);

    // Save the serialized state to local storage
    localStorage.setItem('customizationState', serializedState);

    // Optionally, you can display a message or perform other actions after saving
    console.log('Customization state saved successfully!');
}






function shareDesign() {
    // Assuming you have implemented the sharing functionality using social media or email
    // Display a simple alert to notify the user
    alert('Customized design shared successfully!');
}

function handleResponsiveDesign() {
    // Assuming you have implemented responsive design logic based on screen size
    // Log a message to indicate that responsive design is being handled
    console.log('Responsive design is being handled...');
}