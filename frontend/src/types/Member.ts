interface MemberType {
    name: string;
    displayName?: string;
}

interface ContactingMinisters {
    minister_id: number;
    member_id: number;
    created_at: string;
}

export interface MemberObj {
    member: MemberResponse;
}

export interface BaseMember {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    username?: string;
    email: string;
    image_url?: string;
}
  
export interface Member extends BaseMember {
    memberType: string;
    latestContact: string | null;
    created_at: string;
}

// member data returned from api
export interface MemberResponse extends BaseMember {
    memberType: MemberType;
    latestContact: string;
    contactingMinisters: ContactingMinisters[];
    created_at: string;
}

export interface Minister extends BaseMember {
    members: Member[];
}

// minister data returned from api
export interface MinisterResponse extends BaseMember {
    memberType: MemberType;
    latestContact: string;
    members: MemberObj[];
}
