import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
class RoomInput {
  @Field({ nullable: false })
  name: string;
}

@InputType()
class PlayerInput {
  @Field({ nullable: false })
  name: string;
  
  @Field({ nullable: true })
  socketId?: string;
}

@InputType()
export class RoomArgs {
  @Field({ nullable: true })
  room?: RoomInput;
  
  @Field({ nullable: true })
  player?: PlayerInput;
}

@ObjectType()
class RoomType {
  @Field({ nullable: false })
  name: string;
}

@ObjectType()
class PlayerType {
  @Field({ nullable: false })
  name: string;
}

@ObjectType()
export class RoomTypes {
  @Field({ nullable: true })
  room: RoomType;
  
  @Field({ nullable: true })
  player: PlayerType;
}