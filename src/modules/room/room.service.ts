import { generate } from 'short-uuid'
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RoomRepository } from 'modules/room/room.repository';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { RoomEntity } from 'modules/room/room.entity';
import { PlayerEntity } from 'modules/player/player.entity';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';

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
      socketId: createRoomDTO.socketId,
      createdAt: new Date()
    }
    
    const room: Partial<RoomEntity> = {
      name,
      createdAt: new Date(),
      players: [player]
    };
    
    try {
      return await this.roomRepository.createRoom(<RoomEntity>room);
    } catch (error) {
      throw new InternalServerErrorException(`Error on create room ${name}`, error);
    }
  }
  
  public async joinRoom(joinRoomDTO: JoinRoomDTO): Promise<boolean> {
    const room = await this.roomRepository.getRoom(joinRoomDTO.room);
    if (!room) {
      throw new BadRequestException(`Room ${joinRoomDTO.room} not exists`);
    }
    
    const [playerAlreadyJoined] = room.players.filter(player => player.name === joinRoomDTO.player);
    if (playerAlreadyJoined && playerAlreadyJoined.socketId !== joinRoomDTO.socketId) {
      throw new BadRequestException(`Player ${joinRoomDTO.player} already exists`);
    }
    
    if (playerAlreadyJoined) {
      return true;
    }
  
    if (room.players.length > 10) {
      throw new BadRequestException(`Room ${joinRoomDTO.room} is full`);
    }
    
    room.players.push({
      name: joinRoomDTO.player,
      socketId: joinRoomDTO.socketId,
      createdAt: new Date()
    });
    
    const update: Partial<RoomEntity> = {
      name: room.name,
      players: room.players,
      createdAt: room.createdAt,
    }

    try {
      await this.roomRepository.updateRoom(<RoomEntity>update);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(`Error on create room ${name}`, error);
    }
  }
}