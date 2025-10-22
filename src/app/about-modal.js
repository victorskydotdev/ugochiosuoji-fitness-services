const readMoreBtn = document.querySelector('.read-more-btn');
const aboutModalBox = document.querySelector('.about-modal-box');

export const showAboutInfo = () => {
	if (!readMoreBtn) return;

	const template = () => {
		return `
        <div class="container">
          <p class="text">That spark lit by my sister became a fire. Over the years, I grew to love the discipline, strength, and confidence that fitness brings. It became more than just exercise — it became a way of life, a means of worship, and a tool to equip me for my assignments in life.
          </p>
         
          <p class="text">Another huge influence was my upbringing. I was raised by two teachers who instilled in me the value of hard work, continuous learning, and the responsibility to teach and share knowledge with others. That background shaped how I now approach fitness — not just as a coach, but as a teacher, motivator, and guide
          </p>
         
          <p class="text">In a bid to support and help more women, I went on to get certified as a <strong>Healthy Living Ambassador</strong> and also became an <strong>ACE Certified Group Fitness Instructor</strong>. These credentials not only strengthened my knowledge but also equipped me to design holistic programs that blend exercise, nutrition, and accountability.
          </p>
          
          <p class="text">Beyond fitness, I hold a Master’s degree and work in the NGO sector as a development practitioner. I’ve anchored podcasts on Christian living, led group fitness programs, and built a community of women committed to weight loss, health, and accountability. I also speak at conferences and retreats, where I combine practical strategies with faith-centered encouragement to help women thrive in body, soul, and spirit.
          </p>
          
          <p class="text">At the heart of everything I do is this belief: when women are strong and healthy, they are better equipped to live out their God-given purpose.
          </p>
        </div>

        <div class="btn-wrap">
          <button class="about-modal-close-btn">Close dialog box</button>
        </div>
      `;
	};

	readMoreBtn.addEventListener('click', () => {
		aboutModalBox.classList.add('show-modal');

		setTimeout(() => {
			aboutModalBox.innerHTML = template();

			const modalCloseBtn = document.querySelector('.about-modal-close-btn');

			if (!modalCloseBtn) return;

			modalCloseBtn.addEventListener('click', () => {
				aboutModalBox.classList.remove('show-modal');

				aboutModalBox.innerHTML = '';
			});
		}, 1500);
	});
};
