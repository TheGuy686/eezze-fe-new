import Vue from 'vue';

Vue.directive('scroll', {
    inserted: function (el, binding) {
        el._scrollEvent = function (event) {
            binding.value(event);
        };

        el.addEventListener('scroll', el._scrollEvent);
    },
    unbind: function (el, binding) {
        el.removeEventListener('scroll', el._scrollEvent);
    },
});

Vue.directive('e-help', {
    inserted: function (el, binding, vnode) {
        el.style.position = 'relative';
        el.style.display = 'flex';
        el.style['align-items'] = 'center';

        let helpId = `help-btn-${generateRandomString(15)}`;

        el.insertAdjacentHTML('beforeend', `
            <div class="help-floating-content non-sel">
            
                <div id="${helpId}" class="circle-help">?</div>

            </div>
        `);

        el.children[0].addEventListener(
            'click',
            function () {
                let key = '';

                try {
                    key = binding.expression.replace(/^'/, '')
                            .replace(/^"/, '')
                            .replace(/'$/, '')
                            .replace(/"$/, '');
                }
                catch (e) {
                    console.clear();
                    console.log('ERROR: ', e.message);
                }
                
                events.emit('show-help', key);
            }
        );
    },
});

Vue.directive('cases', {
  bind: function (el, binding) {
      let handler = function(e) {
        if (typeof binding.modifiers['camelCase'] != 'undefined') {
            e.target.value = camelCase(e.target.value.trim());
        }
        else if (typeof binding.modifiers['kebabCase'] != 'undefined') {
            e.target.value = kebabCase(e.target.value);
        }
        else if (typeof binding.modifiers['pascalCase'] != 'undefined') {
            e.target.value = pascalCase(e.target.value);
        }
        else if (typeof binding.modifiers['pascalCaseWithSpaces'] != 'undefined') {
            e.target.value = pascalCaseWithSpaces(e.target.value);
        }
        else if (typeof binding.modifiers['upperUnderscoreCase'] != 'undefined') {
            e.target.value = upperUnderscoreCase(e.target.value).toUpperCase();
        }
    }

    el.addEventListener('input', handler);
  },
}
);

Vue.directive('string', 
    {
        bind: function (el, binding) {
            let handler = function(e) {

                if (typeof binding.modifiers['path'] != 'undefined') {
                    let val = e.target.value;

                    val = val.replace(/ /g, '/');

                    e.target.value = val.trim();
                }
            }

            el.addEventListener('input', handler);
        },
    }
);