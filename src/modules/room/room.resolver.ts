import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoomService } from 'modules/room/room.service';
import { RoomArgs } from 'modules/room/room.args';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}
  
  @Query(returns => String)
  async root() {
    return '';
  }
  
  @Mutation(returns => Boolean)
  async createRoom(@Args('data') roomArgs: RoomArgs): Promise<boolean> {
    await this.roomService.createRoom(CreateRoomDTO.fromRoomArgs(roomArgs));
    return true;
  }
  
  @Mutation(returns => Boolean)
  async joinRoom(@Args('data') roomArgs: RoomArgs): Promise<boolean> {
    await this.roomService.joinRoom(JoinRoomDTO.fromRoomArgs(roomArgs));
    return true;
  }
}