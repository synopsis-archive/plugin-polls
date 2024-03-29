/**
 * CorePlugin.BackendDevServer
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PollOptionDto } from './pollOptionDto';
import { ReceivedVotesDto } from './receivedVotesDto';


export interface PollResultDto {
    pollCode: string;
    pollName: string;
    creatorName: string;
    startTime: string;
    endTime: string;
    isMultipleChoice: boolean;
    pollOptions: Array<PollOptionDto>;
    pollQuestion: string;
    receivedAnswers: number;
    results: { [key: string]: ReceivedVotesDto; };
}
