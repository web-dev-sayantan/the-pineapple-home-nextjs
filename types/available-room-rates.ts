import { getAvailableRatesByDate } from "@/data/rooms-dto";

export type AvailableRoomRate = {
	roomId: string;
	name: string;
	description: string;
	isDorm: boolean;
	houseRecommendation: boolean;
	categoryId: string;
	roomGallery: {
		url: string;
		category: string;
	}[];
	rates: AvailableRate[];
	avlCount: number;
	stayDate: Date;
};

export type AvailableRate = {
	rateId: string;
	name: string | null;
	refundable: boolean;
	rate: number;
	headCount: number;
};

type AvailableRoomRatesByDate = ReturnType<typeof getAvailableRatesByDate>;
