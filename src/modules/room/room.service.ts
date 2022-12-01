// Nest.js
import { BadRequestException, Injectable } from '@nestjs/common';

// Config
import { MAX_PLAYERS } from 'env-vars';

// Room
import { RoomRepository } from 'modules/room/room.repository';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { RoomEntity } from 'modules/room/room.entity';

// Match
import { MATCH_STATUS } from 'modules/match/match.enum';
import { MatchService } from 'modules/match/match.service';

// Player
import { PlayerEntity } from 'modules/player/player.entity';
import { PlayerService } from 'modules/player/player.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly playerService: PlayerService,
    private readonly matchService: MatchService,
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
    
    const createPlayer = PlayerEntity.createFromCreateRoomDTO(createRoomDTO);
    await this.playerService.store(createPlayer);
    
    const createRoom = RoomEntity.create(createRoomDTO.roomName);
    createRoom.addPlayer(createPlayer);
    
    return await this.roomRepository.store(createRoom);
  }
  
  /**
   * Join room by JoinRoomDTO
   * @param {JoinRoomDTO} joinRoomDTO
   */
  public async joinRoom(joinRoomDTO: JoinRoomDTO): Promise<void> {
    const room = await this.roomRepository.getRoom(joinRoomDTO.roomName);
    if (!room) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} not exists`);
    }
    
    const [playerAlreadyJoined] = room.players.filter(player => player.name === joinRoomDTO.playerName);
    if (playerAlreadyJoined && playerAlreadyJoined.socketId !== joinRoomDTO.socketId) {
      throw new BadRequestException(`Player ${joinRoomDTO.playerName} already exists`);
    }
    
    if (playerAlreadyJoined) {
      return;
    }
  
    if (room.players.length >= MAX_PLAYERS) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} is full`);
    }
    
    const matchExists = await this.matchService.getMatchByRoomName(room.name);
    if (matchExists.status === MATCH_STATUS.STARTED) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} started`);
    }
    
    const player = PlayerEntity.createFromJoinRoomDTO(joinRoomDTO);
    
    room.addPlayer(player);
    
    await this.roomRepository.store(room);
  }
}