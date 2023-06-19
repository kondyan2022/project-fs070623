import Swiper from 'swiper';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);

export const initSwiper = () => {
    // setTimeout(() => {
    const swiper = new Swiper('.swiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'horizontal',
        loop: true,
        observer: true,
        simulateTouch: false,
        speed: 600
    });
    // }, 0);
}