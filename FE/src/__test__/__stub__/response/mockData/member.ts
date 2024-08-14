/**
 * @url /members
 * @method GET
 * @description 사용자 리스트 불러오기
 */
export const members = {
  members: [
    {
      memberId: 0,
      name: "홍길동",
      activeStatus: "am",
    },
    {
      memberId: 1,
      name: "홍길동",
      activeStatus: "rm",
    },
    {
      memberId: 2,
      name: "홍길동",
      activeStatus: "cm",
    },
    {
      memberId: 3,
      name: "홍길동",
      activeStatus: "ob",
    },
  ],
};

/**
 * @url /members/activeStatus
 * @method GET
 * @description 본인의 활동상태 정보 가져오기
 */
export const myActiveStatus = {
  name: "26기 홍길동",
  activeStatus: "{{oneOf (array 'am' 'rm' 'cm' 'ob')}}",
};

/**
 * @url /members/activeStatus
 * @method PUT
 * @description 본인의 활동상태 변경
 */
export const updateMyActiveStatus = {
  name: "26기 박건규",
  activeStatus: "am",
};

/**
 * @url /members/activestatus/:memberId
 * @method PUT
 * @description 특정 멤버의 활동상태 변경
 */
export const updateMemberActiveStatus = {
  name: "22기 홍길동",
  activeStatus: "am",
};
