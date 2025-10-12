
    const $ = (selector, parent = document) => parent.querySelector(selector);

    const themeToggle = $('#themeToggle');
    themeToggle.addEventListener('click', () => {
  
      document.body.classList.toggle('dark');

      themeToggle.textContent = document.body.classList.contains('dark') ? '◑' : '◐';
    });

    /*
    const likeBtn = document.getElementById("likeBtn");
    
    const likeCount = document.getElementById("likeCount");

 
    let liked = localStorage.getItem("liked") === "true";
    let count = parseInt(localStorage.getItem("likeCount")) || 0;


   if (liked) {
      likeBtn.classList.add("liked");
    }
    likeCount.textContent = count;


    likeBtn.addEventListener("click", () => {
      liked = !liked;

      if (liked) {
        count++;
        likeBtn.classList.add("liked");
      } else {
        count--;
        likeBtn.classList.remove("liked");
      }

      likeCount.textContent = count;


      likeBtn.classList.add("animate");
      setTimeout(() => likeBtn.classList.remove("animate"), 200);


      localStorage.setItem("liked", liked);
      localStorage.setItem("likeCount", count);
    }); */
 
     
  


    
    function closeModal() {
      const modal = $('#projectModal');
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    
    document.getElementById('projectModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


    function copyText(text) { navigator.clipboard.writeText(text).then(()=>alert('Copied: '+text)); }

    
      const scrollBtn = document.getElementById("scrollTopBtn");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          scrollBtn.style.display = "block";
        } else {
          scrollBtn.style.display = "none";
        }
      });

      function scrollup() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    

    function linkedin() { window.open('https://www.linkedin.com/in/daniel-chukwuma-08383930b?trk=contact-info'); }

    function github() { window.open('https://github.com/chukwumaDaniel224'); }

    function whatsapp() { window.open
      ('https://wa.me/2347017951246');
    }

    
    $('#year').textContent = new Date().getFullYear();

    window.addEventListener("DOMContentLoaded", function () {
  console.log("🔎 Script is running!"); // Debug in console

  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "true") {
    alert("✅ Your message has been received!");
    // Clean up URL so ?success=true disappears
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

    /*
    document.addEventListener('keydown', (e) => {
      if (e.key === 't') themeToggle.click();
      if (e.key === 'p') $('#seeProjects').scrollIntoView({behavior:'smooth'});
    }); */
