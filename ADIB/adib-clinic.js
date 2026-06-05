const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const isDarkMode = ref(false);
    const showClinicBubble = ref(false);
    const isModalOpen = ref(false);
    const currentLang = ref("fa");

    // لایبرری محلی ترجمه‌ها
    const translations = {
      fa: {
        clinicLabel: "کلینیک",
        navAbout: "درباره ما",
        navTeam: "تیم متخصصان",
        navContact: "تماس و آدرس",
        navMessage: "ارسال پیام",
        btnReserve: "رزرو نوبت آنلاین",
        heroWelcome: "به کلینیک لوکس ادیب خوش آمدید",
        heroTitle:
          "مراقبت متمایز و حرفه‌ای <br /> <span class='text-luxury-sage dark:text-luxury-gold'>برای همراهان وفادار شما</span>",
        heroDesc:
          "در کلینیک ادیب، ما پیشرفته‌ترین تکنولوژی‌های روز تشخیصی و درمانی دامپزشکی را با فضایی آرامش‌بخش و ممتاز تلفیق کرده‌ایم تا تجربه‌ای بی‌نقص برای حیوانات خانگی شما فراهم آوریم.",
        heroBtnInstant: "تعیین وقت فوری",
        heroBtnMore: "اطلاعات بیشتر",
        stat1Num: "۶ نفر",
        stat1Title: "کادر متخصص و مجرب",
        stat2Num: "۱۴۰۱",
        stat2Title: "سال تأسیس مجموعه",
        stat3Num: "+۱۵",
        stat3Title: "خدمات فوق تخصصی",
        stat4Num: "۲۴/۷",
        stat4Title: "پشتیبانی اورژانسی",
        aboutTitle: "درباره کلینیک تخصصی ادیب",
        aboutDesc:
          "کلینیک ادیب با هدف ارائه استانداردهای تراز اول بین‌المللی در حوزه سلامت، جراحی و زیبایی حیوانات خانگی راه‌اندازی شده است. ما معتقدیم هر مراجعه‌کننده لایق برخورد VIP و بالاترین دقت پزشکی است.",
        aboutFeat1: "اتاق جراحی مجهز به پیشرفته‌ترین تجهیزات مانیتورینگ",
        aboutFeat2: "بخش مجزا و آرام برای بستری سگ‌ها و گربه‌ها",
        aboutFeat3: "داروخانه تخصصی و کلینیک دندان‌پزشکی دامپزشکی",
        teamTitle: "تیم متخصص و پزشکان کلینیک ادیب",
        teamSub:
          "آشنایی با کادر ۶ نفره حرفه‌ای ما که هر لحظه متعهد به سلامت پت گران‌بهای شما هستند.",
        mapBtnBubble: "مشاهده اطلاعات زنده نقشه",
        mapBubbleTitle: "موقعیت مرکزی تهران (خیابان فرشته)",
        mapBubbleDesc:
          "ساعات اوج شلوغی: ۱۶:۰۰ الی ۲۰:۰۰ - پیشنهاد می‌شود پیش از مراجعه حتماً نوبت رزرو فرمایید.",
        infoTitle: "موقعیت و اطلاعات تماس",
        infoSub:
          "اطلاعات ذیل آدرس موقت فرضی جهت دمو می‌باشد. مشخصات نهایی بعداً بارگذاری خواهد شد.",
        infoAddressLabel: "آدرس کلینیک",
        infoAddressValue:
          "تهران، منطقه ۱، خیابان فرشته (شهید فیاضی)، پلاک ۱۰۰، ساختمان ادیب",
        infoPhoneLabel: "شماره‌های تماس",
        infoPhoneValue: "۰۲۱-۲۲۰۰۰۰۰۰",
        infoHoursLabel: "ساعات کاری",
        infoHoursValue: "همه روزه از ساعت ۹:۰۰ صبح الی ۲۲:۰۰ شب",
        formContactTitle: "ارسال پیام و فرم پرسش‌و‌پاسخ",
        formContactSub:
          "هرگونه سوال، انتقاد یا پیشنهادی دارید را برای مدیریت ارسال کنید.",
        formLabelName: "نام و نام خانوادگی",
        formPlaceName: "مثال: امیرحسین ادیب",
        formLabelPhone: "شماره موبایل",
        formPlacePhone: "۰ Emily۳۴۵۶۷۸۹",
        formLabelMessage: "متن پیام شما",
        formPlaceMessage: "پیام خود را به تفصیل اینجا بنویسید...",
        formBtnSubmit: "ارسال پیام امن به پایگاه داده",
        formBtnLoading: "در حال ثبت اطلاعات...",
        formSuccess: "پیام شما با موفقیت در دیتابیس ثبت شد.",
        formError: "خطا در ذخیره‌سازی داده.",
        modalTitle: "سامانه رزرو نوبت آنلاین پت",
        modalLabelOwner: "نام سرپرست",
        modalLabelPet: "نوع و نژاد پت",
        modalPlacePet: "مثال: گربه پرشین",
        modalLabelPhone: "شماره همراه",
        modalLabelDate: "تاریخ پیشنهادی",
        modalLabelService: "بخش درمانی",
        optService1: "چکاپ عمومی و واکسیناسیون",
        optService2: "جراحی تخصصی",
        optService3: "دندانپزشکی پت",
        optService4: "آرایشگاه و زیبایی",
        modalBtnCancel: "انصراف",
        modalBtnSubmit: "تایید و ثبت نوبت",
        modalBtnSaving: "در حال ثبت...",
        modalSuccess:
          "درخواست نوبت شما با موفقیت در دیتابیس پردازش و ذخیره شد.",
        modalError: "خطا در سیستم رزرواسیون.",
        footerCopyright: "© ۲۰۲۶. تمامی حقوق محفوظ است.",
      },
      en: {
        clinicLabel: "Clinic",
        navAbout: "About Us",
        navTeam: "Our Team",
        navContact: "Contact & Location",
        navMessage: "Send Message",
        btnReserve: "Online Reservation",
        heroWelcome: "WELCOME TO ADIB LUXURY CLINIC",
        heroTitle:
          "Distinct & Professional Care <br /> <span class='text-luxury-sage dark:text-luxury-gold'>For Your Loyal Companions</span>",
        heroDesc:
          "At Adib Clinic, we combine cutting-edge veterinary diagnostic and treatment medical tools with a tranquil, premium environment to deliver a flawless experience for your beloved pets.",
        heroBtnInstant: "Instant Appointment",
        heroBtnMore: "Learn More",
        stat1Num: "6 Staff",
        stat1Title: "Expert & Experienced Team",
        stat2Num: "2022",
        stat2Title: "Year Established",
        stat3Num: "+15",
        stat3Title: "Specialized Services",
        stat4Num: "24/7",
        stat4Title: "Emergency Support",
        aboutTitle: "About Adib Specialized Clinic",
        aboutDesc:
          "Adib Clinic was launched with the goal of providing top-tier international standards in pet healthcare, surgery, and grooming. We firmly believe that every visitor deserves a VIP experience and the highest level of medical accuracy.",
        aboutFeat1: "Operating room equipped with advanced monitoring systems",
        aboutFeat2: "Separate and quiet wards for dogs and cats",
        aboutFeat3: "Specialized pharmacy and pet dental clinic",
        teamTitle: "Our Professional Medical Team",
        teamSub:
          "Meet our 6-member dedicated staff, fully committed to your precious companion's health.",
        mapBtnBubble: "View Live Map Info",
        mapBubbleTitle: "Central Tehran Location (Fereshteh St.)",
        mapBubbleDesc:
          "Peak Hours: 16:00 - 20:00. Booking an appointment prior to your visit is highly recommended.",
        infoTitle: "Location & Contact Details",
        infoSub:
          "The following details represent a temporary demo address. Final data will be uploaded later.",
        infoAddressLabel: "Clinic Address",
        infoAddressValue:
          "Adib Bldg, No. 100, Fereshteh (Shahid Fayazi) St, District 1, Tehran",
        infoPhoneLabel: "Phone Numbers",
        infoPhoneValue: "+98 21 22000000",
        infoHoursLabel: "Working Hours",
        infoHoursValue: "Every day from 9:00 AM to 10:00 PM",
        formContactTitle: "Send a Message & Feedback",
        formContactSub:
          "Send your questions, criticisms, or inquiries directly to management.",
        formLabelName: "Full Name",
        formPlaceName: "e.g., Amirhossein Adib",
        formLabelPhone: "Mobile Number",
        formPlacePhone: "09123456789",
        formLabelMessage: "Your Message",
        formPlaceMessage: "Type your detailed message here...",
        formBtnSubmit: "Securely Send to Database",
        formBtnLoading: "Submitting details...",
        formSuccess:
          "Your message has been successfully saved in the database.",
        formError: "Error storing data.",
        modalTitle: "Online Pet Appointment System",
        modalLabelOwner: "Owner Name",
        modalLabelPet: "Pet Type & Breed",
        modalPlacePet: "e.g., Persian Cat",
        modalLabelPhone: "Mobile Number",
        modalLabelDate: "Proposed Date",
        modalLabelService: "Medical Department",
        optService1: "General Checkup & Vaccination",
        optService2: "Specialized Surgery",
        optService3: "Pet Dentistry",
        optService4: "Grooming & Styling",
        modalBtnCancel: "Cancel",
        modalBtnSubmit: "Confirm Appointment",
        modalBtnSaving: "Saving...",
        modalSuccess:
          "Your appointment request was processed and saved successfully.",
        modalError: "Error in reservation system.",
        footerCopyright: "© 2026. All Rights Reserved.",
      },
    };

    const t = computed(() => translations[currentLang.value]);

    const toggleLanguage = () => {
      const icon = document.getElementById("lang-icon");
      if (icon) {
        icon.classList.add("rotate-anim");
        setTimeout(() => icon.classList.remove("rotate-anim"), 500);
      }
      currentLang.value = currentLang.value === "fa" ? "en" : "fa";
      document.documentElement.lang = currentLang.value;
      document.documentElement.dir = currentLang.value === "fa" ? "rtl" : "ltr";
    };

    const toggleTheme = () => {
      const themeIcon = document.getElementById("theme-icon");
      if (themeIcon) {
        themeIcon.classList.add("rotate-anim");
        setTimeout(() => themeIcon.classList.remove("rotate-anim"), 500);
      }
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const openModal = () => {
      isModalOpen.value = true;
    };
    const closeModal = () => {
      isModalOpen.value = false;
    };

    // بانک اطلاعات کادر پزشکی دوزبانه
    const teamData = {
      fa: [
        {
          id: 1,
          name: "دکتر علیرضا ادیب",
          role: "بنیان‌گذار و جراح ارشد",
          bio: "متخصص جراحی بافت نرم و سخت با ۱۲ سال سابقه.",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 2,
          name: "دکتر سارا مهدوی",
          role: "متخصص داخلی حیوانات",
          bio: "فارغ‌التحصیل ممتاز دانشگاه تهران، متخصص بیماری‌های عفونی.",
          image:
            "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 3,
          name: "مهندس کامران رستمی",
          role: "مدیر ارشد اجرایی",
          bio: "ناظر کیفی خدمات مشتریان و بهینه‌سازی زنجیره تامین.",
          image:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 4,
          name: "نیلوفر رضایی",
          role: "تکنسین ارشد آزمایشگاه",
          bio: "کارشناس خبره رادیولوژی و آزمایشگاه خون هماتولوژی.",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 5,
          name: "امیر محمدی",
          role: "پرستار تخصصی بستری",
          bio: "مراقب حرفه‌ای و هماهنگ‌کننده تغذیه و مانیتورینگ بیماران.",
          image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 6,
          name: "روژین حسینی",
          role: "مسئول پذیرش و CRM",
          bio: "پاسخگوی مراجعین و مدیریت‌کننده زنجیره نوبت‌دهی آنلاین.",
          image:
            "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=500",
        },
      ],
      en: [
        {
          id: 1,
          name: "Dr. Alireza Adib",
          role: "Founder & Chief Surgeon",
          bio: "Soft and hard tissue surgery specialist with 12 years of clinical experience.",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 2,
          name: "Dr. Sara Mahdavi",
          role: "Internal Medicine Specialist",
          bio: "Honors graduate from the University of Tehran, expert in infectious diseases.",
          image:
            "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 3,
          name: "Mr. Kamran Rostami",
          role: "Chief Operating Officer",
          bio: "Customer service quality supervisor and supply chain coordinator.",
          image:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 4,
          name: "Niloofar Rezaei",
          role: "Senior Lab Technician",
          bio: "Expert radiologist and clinical hematology blood laboratory scientist.",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 5,
          name: "Amir Mohammadi",
          role: "Specialized Ward Nurse",
          bio: "Professional caretaker, managing nutrition and patient monitoring plans.",
          image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500",
        },
        {
          id: 6,
          name: "Rozhin Hosseini",
          role: "Receptionist & CRM Lead",
          bio: "Customer relations supervisor managing the online queuing chain.",
          image:
            "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=500",
        },
      ],
    };

    const currentTeamData = computed(() => teamData[currentLang.value]);

    const contactForm = reactive({ name: "", phone: "", message: "" });
    const contactStatus = reactive({
      loading: false,
      text: "",
      isError: false,
    });

    const submitContactForm = async () => {
      contactStatus.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        contactStatus.isError = false;
        contactStatus.text = t.value.formSuccess;
        contactForm.name = "";
        contactForm.phone = "";
        contactForm.message = "";
      } catch {
        contactStatus.isError = true;
        contactStatus.text = t.value.formError;
      } finally {
        contactStatus.loading = false;
      }
    };

    const appointmentForm = reactive({
      ownerName: "",
      petType: "",
      phone: "",
      date: "",
      service: "checkup",
    });
    const appointmentStatus = reactive({
      loading: false,
      text: "",
      isError: false,
    });

    const submitAppointment = async () => {
      appointmentStatus.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        appointmentStatus.isError = false;
        appointmentStatus.text = t.value.modalSuccess;
        setTimeout(() => {
          closeModal();
        }, 2000);
      } catch {
        appointmentStatus.isError = true;
        appointmentStatus.text = t.value.modalError;
      } finally {
        appointmentStatus.loading = false;
      }
    };

    return {
      isDarkMode,
      toggleTheme,
      showClinicBubble,
      isModalOpen,
      openModal,
      closeModal,
      currentLang,
      toggleLanguage,
      t,
      currentTeamData,
      contactForm,
      contactStatus,
      submitContactForm,
      appointmentForm,
      appointmentStatus,
      submitAppointment,
    };
  },
}).mount("#app");
