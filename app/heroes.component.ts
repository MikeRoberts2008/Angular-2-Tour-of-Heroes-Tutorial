import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { Router }       from '@angular/router';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl:  `heroes.component.html`,
    styleUrls: [ `heroes.component.css` ],
    providers: []
})

export class HeroesComponent implements OnInit {

    constructor(private router: Router,
                private heroService: HeroService){
    }

    heroes: Hero[];
    selectedHero: Hero;

    ngOnInit(): void{
        this.getHeroes();
    }   

    //A method to update the selected hero
    onSelect(hero: Hero): void{
        this.selectedHero = hero;
    }
    
    getHeroes(): void{
        this.heroService.getHeros().then(heroes => this.heroes = heroes);
    }

    gotoDetail(): void{
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if(!name) { return; }
        this.heroService.create(name)
            .then(hero => { 
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
    }
 }