const link = document.querySelectorAll('a.internal-link');

const navbar = document.querySelector('nav .navbar');

const getComponenteDistance = (element) => {
	const id = element.getAttribute("href");
	return document.querySelector(id).offsetTop;
};

const smoothScrollTo = (endX, endY, duration) => {
	const startX = window.scrollX || window.pageXOffset;
	const startY = window.scrollY || window.pageYOffset;

	const distanceX = endX - startX;
	const distanceY = endY - startY;

	const startTime = new Date().getTime();

	duration = typeof duration !== "undefined" ? duration : 600;

	const easeInOutQuart = (time, from, distance, duration) => {
		if((time /= duration / 2) < 1)
			return (distance / 2) * time * time * time * time + from;
		return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
	};

	const timer = setInterval( () => {
		const time = new Date().getTime() - startTime;
		const newX = easeInOutQuart(time, startX, distanceX, duration);
		const newY = easeInOutQuart(time, startY, distanceY, duration);

		if(time >= duration){
			clearInterval(timer);
		}

		window.scroll(newX, newY);

	}, 1000 / 60);
}


const clickMenu = (event) => {
	event.preventDefault();
	const distanceComponente = getComponenteDistance(event.target);
	smoothScrollTo(0, distanceComponente, 1000);  
	
};

link.forEach((element) => {
	element.addEventListener("click", clickMenu);
}); 


const mainSections = document.querySelectorAll("main section[id]");

const detectChangeSection = () => {
	const windowY = window.scrollY || window.pageYOffset;

    for (let y = 0; y < mainSections.length; y++) {
		
		const element = mainSections.item(y);

		if(windowY >= element.offsetTop && windowY < ((element.offsetHeight * (y + 1)) -  (window.outerHeight / 2))){
			return element;
		}
        
    }
};