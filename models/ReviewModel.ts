import { tr } from '../classes/globals';
import UserModel from './UserModel';

interface IAccessRole {
    id: number;
    comment: string;
    role: string;
    rating: number;
    description: string;
    reviewedAt: string;
    reviewer: UserModel;
    author: string;
}

export default class ReviewModel implements IAccessRole {
    id: number;
    comment: string;
    role: string;
    rating: number;
    description: string;
    reviewedAt: string;
    reviewer!: UserModel;
    author: string = '';

    constructor(
        id: number,
        comment: string,
        role: string,
        rating: number,
        description: string,
        reviewedAt: string,
        reviewer: UserModel | string | object,
    ) {
        this.id = id;
        this.comment = comment;
        this.description = description;
        this.role = role;
        this.rating = rating;
        this.reviewedAt = reviewedAt;

        if (reviewer instanceof UserModel) {
            this.reviewer = reviewer;
        }
        else if (typeof reviewer == 'object') {
            this.reviewer = UserModel.create(reviewer);
        }
        else if (typeof reviewer == 'string') {
            try {
                this.reviewer = UserModel.create(JSON.parse(reviewer));
            }
            catch (err) {}
        }

        if (this.reviewer) {
            this.author = `${this.reviewer.firstName} ${this.reviewer.lastName}`;
        }
    }

    static create(obj: any = {}): ReviewModel {
        return new ReviewModel(
            obj['id'] || undefined,
            obj['comment'] || undefined,
            obj['role'] || undefined,
            obj['rating'] || undefined,
            obj['description'] || undefined,
            obj['reviewedAt'] || undefined,
            obj['reviewer'] || undefined,
        );
    }

    static getColumns(ignoreColumns: string[] = []): string[] {
        let cols: any = [
            {
                title: tr('id'),
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: tr('role'),
                dataIndex: 'role',
                sorter: true,
            },
            {
                title: tr('description'),
                dataIndex: 'description',
                sorter: false
            },
        ];

        if (ignoreColumns.length > 0) {
            return cols.filter((i: any) => ignoreColumns.indexOf(i['dataIndex']) == -1);
        }

        return cols;
    }
}