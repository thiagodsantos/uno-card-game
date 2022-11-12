import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RoomRepository } from 'modules/room/room.repository';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { RoomEntity } from 'modules/room/room.entity';
import { PlayerEntity } from 'modules/player/player.entity';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { MatchRepository } from 'modules/match/match.repository';
import { MATCH_STATUS } from 'modules/match/match.enum';
import { MAX_PLAYERS } from 'env-vars';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly matchRepository: MatchRepository,
  ) {}
  
  /**
   * Create room by CreateRoomDTO
   * @param {CreateRoomDTO} roomName
   */
  public async createRoom(createRoomDTO: CreateRoomDTO): Promise<RoomEntity> {
    const name = createRoomDTO.roomName;
    
    const roomExists = await this.roomRepository.getRoom(name);
    if (roomExists) {
      throw new BadRequestException(`Room ${name} already exists`);
    }
    
    const player = PlayerEntity.createFromCreateRoomDTO(createRoomDTO);
    
    const createRoom = RoomEntity.create(createRoomDTO.roomName);
    createRoom.addPlayer(player);
    
    return await this.roomRepository.store(createRoom);
  }
  
  /**
   * Join room by JoinRoomDTO
   * @param {JoinRoomDTO} joinRoomDTO
   */
  public async joinRoom(joinRoomDTO: JoinRoomDTO): Promise<void> {
    const room = await this.roomRepository.getRoom(joinRoomDTO.room);
    if (!room) {
      throw new BadRequestException(`Room ${joinRoomDTO.room} not exists`);
    }
    
    const [playerAlreadyJoined] = room.players.filter(player => player.name === joinRoomDTO.player);
    if (playerAlreadyJoined && playerAlreadyJoined.socketId !== joinRoomDTO.socketId) {
      throw new BadRequestException(`Player ${joinRoomDTO.player} already exists`);
    }
    
    if (playerAlreadyJoined) {
      return;
    }
  
    if (room.players.length >= MAX_PLAYERS) {
      throw new BadRequestException(`Room ${joinRoomDTO.room} is full`);
    }
    
    const matchExists = await this.matchRepository.getMatch(room.name);
    if (matchExists && matchExists.status === MATCH_STATUS.STARTED) {
      throw new BadRequestException(`Room ${joinRoomDTO.room} started`);
    }
    
    const player = PlayerEntity.createFromJoinRoomDTO(joinRoomDTO);
    
    room.addPlayer(player);
    
    await this.roomRepository.store(room);
  }
}