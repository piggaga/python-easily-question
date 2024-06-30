var jsonData;
        var currentIndex = 0;

        fetch('./json/question.json')
            .then(response => response.json()) 
            .then(data => {
                jsonData = data; 
                displayData(currentIndex); 
                updateButtonVisibility(currentIndex); 
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });

        document.getElementById('prevButton').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                displayData(currentIndex);
                hideDetailInfo(); 
                updateButtonVisibility(currentIndex);
            }
        });

        document.getElementById('nextButton').addEventListener('click', function() {
            if (currentIndex < jsonData.length - 1) {
                currentIndex++;
                displayData(currentIndex);
                hideDetailInfo(); 
                updateButtonVisibility(currentIndex);
            }
        });

        document.getElementById('toggleDetailButton').addEventListener('click', function() {
            var detailInfo = document.getElementById('detailInfo');
            if (detailInfo.classList.contains('hidden')) {
                displayDetailData(currentIndex); 
                detailInfo.classList.remove('hidden');
                this.textContent = '隱藏答案'; 
            } else {
                detailInfo.classList.add('hidden');
                this.textContent = '顯示答案'; 
            }
        });

        function displayData(index) {
            var dataDisplay = document.getElementById('dataDisplay');
            var question = jsonData[index];
            dataDisplay.innerHTML = `
                <p><strong>題目:</strong></p>
                <pre>${question.question}</pre>
            `;
        }

        function displayDetailData(index) {
            var detailInfo = document.getElementById('detailInfo');
            var question = jsonData[index];
            detailInfo.innerHTML = `
                <p><strong>參考答案:</strong></p>
                <pre>${question.answer}</pre>
            `;
        }

        function hideDetailInfo() {
            var detailInfo = document.getElementById('detailInfo');
            detailInfo.classList.add('hidden');
            document.getElementById('toggleDetailButton').textContent = '顯示答案';
        }

        function updateButtonVisibility(index) {
            var prevButton = document.getElementById('prevButton');
            var nextButton = document.getElementById('nextButton');
            var toggleDetailButton = document.getElementById('toggleDetailButton');

            prevButton.classList.toggle('hidden', index === 0);
            nextButton.classList.toggle('hidden', index === jsonData.length - 1);
            toggleDetailButton.classList.remove('hidden'); 
        }