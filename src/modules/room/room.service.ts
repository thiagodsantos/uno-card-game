import { generate } from 'short-uuid'
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RoomRepository } from 'modules/room/room.repository';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { RoomEntity } from 'modules/room/room.entity';
import { PlayerEntity } from 'modules/player/player.entity';

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) {}
  
  /**
   * Create room by name
   * @param string roomName
   */
  public async createRoom(createRoomDTO: CreateRoomDTO): Promise<RoomEntity> {
    // TODO: Use helper instead
    const name = createRoomDTO.roomName + '_' + generate();
    
    const roomExists = await this.roomRepository.getRoom(name);
    if (roomExists) {
      throw new BadRequestException(`Room ${name} already exists`);
    }
  
    // TODO: Dispatch event instead set player
    const player: PlayerEntity = {
      name: createRoomDTO.playerName,
      createdAt: new Date()
    }
    
    const room: RoomEntity = {
      name,
      createdAt: new Date(),
      players: [player]
    };
    
    try {
      return await this.roomRepository.createRoom(room);
    } catch (error) {
      throw new InternalServerErrorException(`Error on create room ${name}`, error);
    }
  }
}