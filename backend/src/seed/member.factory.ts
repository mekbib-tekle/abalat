import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Member, MaritalStatus, Gender } from '../entities/member.entity';

export default setSeederFactory(Member, (faker) => {
    const member = new Member();
    const sex = faker.person.sex();
    const maritalStatus = faker.helpers.enumValue(MaritalStatus);
    const spouseSex = sex === 'male' ? 'female' : 'male';

    member.firstName = faker.person.firstName();
    member.middleName = faker.person.firstName();
    member.lastName = faker.person.lastName();
    member.email = faker.internet.email();
    member.username = faker.internet.userName();
    // member.memberType = faker.number.int({ min: 1, max: 1 });
    member.phoneNumber = faker.phone.number();
    member.address = faker.location.streetAddress();
    member.previousChurch = faker.location.city();
    member.roleInPreviousChurch = maritalStatus;
    member.isBaptised = faker.datatype.boolean(0.9);
    member.spouseName = faker.person.fullName({sex: spouseSex});
    member.childrenNames = maritalStatus !== 'Single' ? faker.person.fullName({sex: 'female'}) : null;
    member.emergencyContact = faker.person.fullName();
    member.maritalStatus = maritalStatus;
    member.hasLetterFromPrevChurch = faker.datatype.boolean(0.5);
    member.notes = faker.lorem.sentences();
    member.gender = Gender[1];

    return member;
});