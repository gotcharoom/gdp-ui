import CommonPage from '@/common/components/CommonPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Card, CardContent, Typography } from '@mui/material';

// 더미 데이터 (32개의 카드)
const cards = Array.from({ length: 32 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
}));

const ITEMS_PER_PAGE = 8;

const AchievementTest = () => {
    // 카드 데이터를 8개씩 나누어 배열로 저장
    const pagedData = [];
    for (let i = 0; i < cards.length; i += ITEMS_PER_PAGE) {
        pagedData.push(cards.slice(i, i + ITEMS_PER_PAGE));
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={'테스트 페이지'}>
            <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                spaceBetween={20}
                slidesPerView={1} // 한 번에 한 페이지씩 넘기기
            >
                {pagedData.map((page, index) => (
                    <SwiperSlide key={index}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {page.map((card) => (
                                <Card key={card.id} sx={{ padding: 2 }}>
                                    <CardContent>
                                        <Typography variant='h6'>{card.title}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CommonPage>
    );
};

export default AchievementTest;
