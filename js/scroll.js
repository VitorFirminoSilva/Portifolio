const navMenu = document.querySelectorAll('.navigation li a');
const goTopBTN = document.querySelector('.scrollUp');

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

	if(!event.target.classList.contains("active")){
		navMenu.forEach((element) => {
			element.classList.remove("active");
		});

		const distanceComponente = getComponenteDistance(event.target);
		smoothScrollTo(0, distanceComponente, 800);

		event.target.classList.add("active");
	}
};

navMenu.forEach((element) => {
	element.addEventListener("click", clickMenu);
});

/*BTN SCROLL TOP*/
const activeBtn = () => {

	const startY = window.scrollY || window.pageYOffset;

	if(startY > 600){
		goTopBTN.style.display = "block";
	} else {
		goTopBTN.style.display = "none";
	}
}

const scrollUp = () => {
	const component = document.querySelector("#about").offsetTop;
	smoothScrollTo(0, component, 800);
};

goTopBTN.addEventListener("click", scrollUp);



document.addEventListener("scroll", activeBtn);
/*BTN SCROLL TOP*/