class UsersService {
  dtoToUser(dto) {
    return new User({
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      avatar: dto.avatar
    })
  }

  userToDto(user) {
    return new UserDto({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      avatar: user.avatar
    })
  }
}

class UserDto {
  constructor({ id, first_name, last_name, email, avatar }) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.avatar = avatar
  }
}

class User {
  constructor({ id, firstName, lastName, email, avatar }) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
  }
}

export default UsersService
